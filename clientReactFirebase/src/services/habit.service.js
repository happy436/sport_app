import { ref, set, get, remove } from "firebase/database";
import { database } from "../firebase";
import localStorageService from "./localStorage.service";

const habitsService = {
	get: async (userId) => {
		const data = await get(ref(database, `habits/${userId}`));
		if (data.exists()) {
			const habits = data.val();
			return Object.values(habits);
		} else {
			return [];
		}
	},
	create: async (habit) => {
		const { userId, _id } = habit;
		await set(ref(database, "habits/" + userId + "/" + _id), habit);
		return habit;
	},
	delete: async (id) => {
        const userId = localStorageService.getUserId()
        const url = `habits/${userId}/${id}/`
        try {
            const databaseRef = await ref(database, url)
            await set(databaseRef,null)
        } catch (error) {
            console.log(error)
        }
    },
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

			} else {

			}
		} catch (error) {
			console.error(error);
		}
	},
};

export default habitsService;
