import { ref, set, get } from "firebase/database";
import { database } from "../firebase";

const habitService = {
	get: async (userId) => {
		const data = await get(ref(database, `habits/${userId}`));
		if (data.exists()) {
			const habits = data.val();
			console.log("User habits:", Object.values(habits));
			return Object.values(habits);
		} else {
			console.log("No data available for this user.");
			return null;
		}
	},
	create: async (habit) => {
		const { userId, _id } = habit;
		await set(ref(database, "habits/" + userId + "/" + _id), habit);
		return habit;
	},
	delete: () => {},
	edit: () => {},
	addNewValue: () => {},
};

export default habitService;
