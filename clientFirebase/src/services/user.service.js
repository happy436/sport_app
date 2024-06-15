import httpService from "./http.service";
import localStorageService from "./localStorage.service";
import { ref, set } from "firebase/database";
import { database } from "../firebase";

const userEndpoint = "user/";

const userService = {
	get: async () => {
		const { data } = await httpService.get(userEndpoint);
		return data;
	},
	create: async ({ email, _id, ...rest }) => {
        const data = {
			userId: _id,
			email: email,
			...rest,
		}
		await set(ref(database, "users/" + _id), data);
		return data
	},
	getCurrentUser: async () => {
		const { data } = await httpService.get(
			userEndpoint + localStorageService.getUserId()
		);
		return data;
	},
	update: async (payload) => {
		const { data } = await httpService.patch(
			userEndpoint + localStorageService.getUserId(),
			payload
		);
		return data;
	},
};
export default userService;
