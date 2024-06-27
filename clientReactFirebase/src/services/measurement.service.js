import { ref, set, get, update } from "firebase/database";
import { database } from "../firebase";

const measurementService = {
	get: async (userId) => {
		const data = await get(ref(database, `measurements/${userId}`));
		if (data.exists()) {
			const measurements = data.val();
			return Object.values(measurements);
		} else {

			return [];
		}
	},
	addCategory: async (payload) => {
		const { userId, _id } = payload;
		await set(
			ref(database, "measurements/" + userId + "/" + _id),
			payload
		);
        return payload
	},
	addMeasure: async (payload) => {
		const { _id, userId } = payload;
		const habitRef = ref(
			database,
			`measurements/${userId}/${_id}/measurements`
		);
		try {
			const snapshot = await get(habitRef);
			if (snapshot.exists()) {
				let historyArray = snapshot.val();
				if (typeof historyArray === "object") {
					historyArray = Object.values(historyArray);
				}

				const findIndex = historyArray.findIndex(
					(item) => item.date === payload.data.date
				);
				let updatedHistoryArray;
				if (findIndex !== -1) {
					updatedHistoryArray = historyArray.map((item) => {
						if (item.date === payload.data.date) {
							return { ...item, value: payload.data.value };
						}
						return item;
					});
				} else {
					updatedHistoryArray = [...historyArray, payload.data];
				}
				await set(habitRef, updatedHistoryArray);

                return payload
			} else {
				await set(habitRef, [payload.data])
			}
		} catch (error) {
			console.error(error);
		}
	},
};

export default measurementService;
