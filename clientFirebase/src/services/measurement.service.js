import { ref, set, get, update } from "firebase/database";
import { database } from "../firebase";

const measurementService = {
    get: async (userId) => {
		const data = await get(ref(database, `measurements/${userId}`));
		if (data.exists()) {
			const habits = data.val();
			return Object.values(habits);
		} else {
			//console.log("No data available for this user.");
			return [];
		}
	},
    addCategory: async(payload) => {
        const {userId, _id} = payload
        await set(ref(database, "measurements/" + userId + _id), payload.data)
    },
    addMeasure: async(payload) => {
        const { _id, userId } = payload;
		const habitRef = ref(database, `measurements/${userId}/${_id}/measurements`);
		try {
			const snapshot = await get(habitRef);
			if (snapshot.exists()) {
				let historyArray = snapshot.val();
				if (typeof historyArray === "object") {
					historyArray = Object.values(historyArray);
				}

                const findIndex = historyArray.findIndex(item => item.date === payload.history.date)
                let updatedHistoryArray
                if(findIndex !== -1){
                    updatedHistoryArray = historyArray.map((item) => {
                        if (item.date === payload.history.date) {
                            return { ...item, value: payload.history.value };
                        }
                        return item;
                    });
                } else {
                    updatedHistoryArray = [...historyArray, payload.history]
                }
				await set(habitRef, updatedHistoryArray);
				console.log("History value updated successfully.");
			} else {
				console.log("No history data available for this habit.");
			}
		} catch (error) {
            console.error(error)
        }
    },
}

export default measurementService