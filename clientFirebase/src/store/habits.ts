import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { Bounce, toast } from "react-toastify";
import localStorageService from "../services/localStorage.service";
import habitsService from "../services/habit.service";
import { AppThunk, RootState } from "./createStore";

export interface Habit {
	_id: string;
	name: string;
	description: string;
	goal: number;
	units: string;
	icon: string;
	color: string;
	tags: string[];
	goalPeriod: string;
	reminderTime: string[];
	reminderMessage: string;
	history: HabitHistory[];
	createdAt: number;
	showMemo: boolean;
	userId: string | null;
}

export interface HabitHistory {
	value: number;
	date: number;
}

interface HabitsState {
	entities: Habit[];
	isLoading: boolean;
	error: string | null;
}

const initialState: HabitsState = {
	entities: [],
	isLoading: false,
	error: null,
};

const habitsSlice = createSlice({
	name: "habits",
	initialState,
	reducers: {
		habitsRequested: (state) => {
			state.isLoading = true;
		},
		habitsReceived: (state, action: PayloadAction<Habit[]>) => {
			state.entities = action.payload;
			state.isLoading = false;
		},
		habitsRequestFailed: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		addHabit: (state, action: PayloadAction<Habit>) => {
			state.entities.push(action.payload);
			state.isLoading = false;
		},
		deleteHabit: (state, action: PayloadAction<{ id: string }>) => {
			state.entities.splice(
				state.entities.findIndex((c) => c._id === action.payload.id),
				1
			);
			state.isLoading = false;
		},
		editHabit: (state, action: PayloadAction<Habit>) => {
			const index = state.entities.findIndex(
				(c) => c._id === action.payload._id
			);
			if (index !== -1) {
				const habit = state.entities[index];
				const historyEntry = action.payload.history[0]; // Assume the payload contains a single history entry to update or add

				const historyIndex = habit.history.findIndex(
					(h) => h.date === historyEntry.date
				);
				if (historyIndex !== -1) {
					// Replace existing history entry
					habit.history[historyIndex] = historyEntry;
				} else {
					// Add new history entry
					habit.history.push(historyEntry);
				}
				state.entities[index] = { ...habit };
			}
			state.isLoading = false;
		},
	},
});

const { reducer: habitsReducer, actions } = habitsSlice;
const {
	habitsRequested,
	habitsReceived,
	habitsRequestFailed,
	addHabit,
	/* deleteHabit, */
	editHabit,
} = actions;

export const loadHabitsList = (): AppThunk => async (dispatch) => {
	const userId = localStorageService.getUserId();
	dispatch(habitsRequested());
	try {
		const fetch = await habitsService.get(userId);
		dispatch(habitsReceived(fetch));
	} catch (error) {
		dispatch(habitsRequestFailed((error as Error).message));
	}
};

export const createHabit =
	(
		payload: Omit<Habit, "_id" | "createdAt" | "userId" | "history">
	): AppThunk =>
	async (dispatch) => {
		const today = Date.now();
		const timestamp = new Date(
			new Date(today).setHours(0, 0, 0, 0)
		).getTime();
		const habit: Habit = {
			...payload,
			_id: nanoid(),
			createdAt: timestamp,
			userId: localStorageService.getUserId(),
			history: [{ value: 0, date: timestamp }],
		};
		dispatch(habitsRequested());
		try {
			const data = await habitsService.create(habit);
			dispatch(addHabit(data));
		} catch (error) {
			dispatch(habitsRequestFailed((error as Error).message));
		}
	};

export const editHabitData =
	(payload: Habit): AppThunk =>
	async (dispatch) => {
		dispatch(habitsRequested());
		const newData = { ...payload, userId: localStorageService.getUserId() };
		try {
			await habitsService.updateValue(newData);
			toast.success("Habit edit successful", {
				autoClose: 2000,
				position: "top-right",
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
				transition: Bounce,
			});
			dispatch(editHabit(payload));
		} catch (error) {
			dispatch(habitsRequestFailed((error as Error).message));
		}
	};

/* export const removeHabit =
	(id: string): AppThunk =>
	async (dispatch) => {
		dispatch(habitsRequested());
		try {
			const { content } = await habitsService.removeNote(id);
			if (content) {
				toast.success("Note deleted successfully", { autoClose: 2000 });
				dispatch(deleteHabit({ id }));
			}
		} catch (error) {
			dispatch(habitsRequestFailed(error.message));
		}
	} */

export const getHabits = (state: RootState): Habit[] => state.habits.entities;
export const getHabitsLoadingStatus = () => (state: RootState): boolean =>
	state.habits.isLoading;

export const getHabitById =
	(id: string) =>
	(state: RootState): Habit | undefined => {
		return state.habits.entities.find((n) => n._id === id);
	};

export default habitsReducer;

/* export interface Habit {
	_id: string;
	name: string;
	description: string;
	goal: number;
	units: string;
	icon: string;
	color: string;
	tags: string[];
	goalPeriod: string;
	reminderTime: string[];
	reminderMessage: string;
	history: { value: number; date: number }[];
	createdAt: number;
	showMemo: boolean;
}

const mockData:Habit[] = [
	{
		_id: "awdawdawdasd",
		name: "Push ups",
		description: "Do 100 push ups per day",
		goal: 100,
		units: "count",
		icon: "🏋️‍♂️",
		color: "indigo",
		tags: [],
		goalPeriod: "day",
		reminderTime: [],
		reminderMessage: "",
		history: [
			{ value: 10, date: 1717189200000 },
			{ value: 15, date: 1717275600000 },
			{ value: 100, date: 1717362000000 },
		],
		createdAt: 1717189200000,
		showMemo: false,
	},
	{
		_id: "bdsjfsd9fsd8f",
		name: "Stand in plank",
		description: "stand in plank 5 sec",
		goal: 5,
		units: "sec",
		icon: "🏃‍♂️",
		color: "green",
		tags: ["running", "exercise", "health"],
		goalPeriod: "day",
		reminderTime: [],
		reminderMessage: "",
		history: [
			{ value: 1, date: 1717189200000 },
			{ value: 2, date: 1717275600000 },
			{ value: 3, date: 1717362000000 },
		],
		createdAt: 1717189200000,
		showMemo: false,
	},
	{
		_id: "9fds8f7ds8f7sd",
		name: "Water Intake",
		description: "Drink 8 glasses of water per day",
		goal: 8,
		units: "glasses",
		icon: "💧",
		color: "blue",
		tags: ["hydration", "health"],
		goalPeriod: "day",
		reminderTime: [],
		reminderMessage: "",
		history: [
			{ value: 8, date: 1717189200000 },
			{ value: 8, date: 1717275600000 },
			{ value: 6, date: 1717362000000 },
		],
		createdAt: 1717189200000,
		showMemo: false,
	},
]; */

/* export interface habitData {
	+ _id: string;
	+ name: string;
	+ description: string;
	
	+ goal: number;
	+ units: string;
	+ icon: string;
	+ color: string;
	+ tags: string[];
	+ goalPeriod: string;
	+ reminderTime: string[];
	+ reminderMessage: string;
	+ showMemo: boolean;
} */
