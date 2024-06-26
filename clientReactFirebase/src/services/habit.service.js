import { ref, set, get } from "firebase/database";
import { database } from "../firebase";

const habitsService = {
	get: async (userId) => {
		const data = await get(ref(database, `habits/${userId}`));
		if (data.exists()) {
			const habits = data.val();
			return Object.values(habits);
		} else {
			//console.log("No data available for this user.");
			return [];
		}
	},
	create: async (habit) => {
		const { userId, _id } = habit;
		await set(ref(database, "habits/" + userId + "/" + _id), habit);
		return habit;
	},
	delete: () => {},
	edit: () => {},
	updateValue: async (payload) => {
		const { _id, userId } = payload;
		const habitRef = ref(database, `habits/${userId}/${_id}/history`);
		try {
			const snapshot = await get(habitRef);
			if (snapshot.exists()) {
				let historyArray = snapshot.val();
				if (typeof historyArray === "object") {
					historyArray = Object.values(historyArray);
				}

				const findIndex = historyArray.findIndex(
					(item) => item.date === payload.history.date
				);
				let updatedHistoryArray;
				if (findIndex !== -1) {
					updatedHistoryArray = historyArray.map((item) => {
						if (item.date === payload.history.date) {
							return { ...item, value: payload.history.value };
						}
						return item;
					});
				} else {
					updatedHistoryArray = [...historyArray, payload.history];
				}
				await set(habitRef, updatedHistoryArray);
				console.log("History value updated successfully.");
			} else {
				console.log("No history data available for this habit.");
			}
		} catch (error) {
			console.error(error);
		}
	},
};

export default habitsService;
