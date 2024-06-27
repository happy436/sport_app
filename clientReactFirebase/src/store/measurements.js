import localStorageService from "@/services/localStorage.service";
import measurementService from "@/services/measurement.service";
import { createSlice, nanoid } from "@reduxjs/toolkit";
import { Bounce, toast } from "react-toastify";

const measurementsSlice = createSlice({
	name: "measurements",
	initialState: {
		entities: [],
		isLoading: true,
		error: null,
	},
	reducers: {
		measurementsRequested: (state) => {
			state.isLoading = true;
		},
		measurementsReceived: (state, action) => {
			state.entities = action.payload;
			state.isLoading = false;
		},
		measurementsRequestFailed: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		addMeasure: (state, action) => {
			const { _id, data } = action.payload;
			const categoryIndex = state.entities.findIndex(
				(item) => item._id === _id
			);

			if (categoryIndex !== -1) {
				const measurementIndex = state.entities[
					categoryIndex
				].measurements.findIndex((item) => item.date === data.date);

				if (measurementIndex === -1) {
					state.entities[categoryIndex].measurements.push(data);
				} else {
					state.entities[categoryIndex].measurements[
						measurementIndex
					] = data;
				}
			} else {
				console.error(`Category with _id ${_id} not found`);
			}

			state.isLoading = false;

			state.isLoading = false;
		},
		addMeasureCategory: (state, action) => {
			state.entities.push(action.payload);
			state.isLoading = false;
		},
	},
});

const { reducer: measurementsReducer, actions } = measurementsSlice;
const {
	measurementsRequested,
	measurementsReceived,
	measurementsRequestFailed,
	addMeasure,
	addMeasureCategory,
} = actions;

export const loadMeasurementsList = () => async (dispatch) => {
	const userId = localStorageService.getUserId();
	dispatch(measurementsRequested());
	try {
		const data = await measurementService.get(userId);
		dispatch(measurementsReceived(data));
	} catch (error) {
		dispatch(measurementsRequestFailed(error.message));
	}
};

export const createMeasurementCategory = (data) => async (dispatch) => {
	const userId = localStorageService.getUserId();
	const measurement = {
		...data,
		_id: nanoid(),
		userId: userId,
		createdAt: Date.now(),
        measurements:[]
	};
	dispatch(measurementsRequested());
	try {
		const fetchData = await measurementService.addCategory(measurement);
		dispatch(addMeasureCategory(fetchData));
	} catch (error) {
		dispatch(measurementsRequestFailed(error.message));
	}
};

export const createMeasure = (payload) => async (dispatch) => {
	const userId = localStorageService.getUserId();
	dispatch(measurementsRequested());
	try {
		await measurementService.addMeasure({
			userId: userId,
			...payload,
		});
		dispatch(addMeasure(payload));
	} catch (error) {
		dispatch(measurementsRequestFailed(error.message));
	}
};

export const getMeasurements = () => (state) => state.measurements.entities;
export const getMeasurementsLoadingStatus = () => (state) =>
	state.measurements.isLoading;

export default measurementsReducer;
