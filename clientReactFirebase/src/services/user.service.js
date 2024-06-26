import { ref, set } from "firebase/database";
import { database } from "../firebase";

const userEndpoint = "users/";

const userService = {
    // TODO do it
/* 	get: async () => {
		const { data } = await httpService.get(userEndpoint);
		return data;
	}, */

    //* Done
	create: async ({ email, _id, ...rest }) => {
        const data = {
			userId: _id,
			email: email,
			...rest,
		}
		await set(ref(database, userEndpoint + _id), data);
		return data
	},

    // TODO do it
/* 	getCurrentUser: async () => {
		const { data } = await httpService.get(
			userEndpoint + localStorageService.getUserId()
		);
		return data;
	}, */
    // TODO do it
/* 	update: async (payload) => {
		const { data } = await httpService.patch(
			userEndpoint + localStorageService.getUserId(),
			payload
		);
		return data;
	}, */
};
export default userService;
