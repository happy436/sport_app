import axios from "axios";
import { toast } from "react-toastify";
import localStorageService from "./localStorage.service";
import authService from "./auth.service";
import { firebaseConfig } from "../firebase";

const http = axios.create({
	baseURL: firebaseConfig.databaseURL,
});

http.interceptors.request.use(
	async function (config) {
		const containSlash = /\/$/gi.test(config.url);
		config.url =
			(containSlash ? config.url.slice(0, -1) : config.url) + ".json";
		const expiresDate = localStorageService.getTokenExpiresDate();
		const refreshToken = localStorageService.getRefreshToken();
		if (refreshToken && expiresDate < Date.now()) {
			const data = await authService.refresh();

			localStorageService.setTokens({
				refreshToken: data.refresh_token,
				idToken: data.id_token,
				expiresIn: data.expires_id,
				localId: data.user_id,
			});
		}
		const accessToken = localStorageService.getAccessToken();
		if (accessToken) {
			config.params = { ...config.params, auth: accessToken };
		}
	},
	function (error) {
		return Promise.reject(error);
	}
);
function transformData(data) {
	return data && !data._id
		? Object.keys(data).map((key) => ({
				...data[key],
		  }))
		: data;
}
http.interceptors.response.use(
	(res) => {
		res.data = { content: transformData(res.data) };
	},
	function (error) {
		const expectedErrors =
			error.response &&
			error.response.status >= 400 &&
			error.response.status < 500;

		if (!expectedErrors) {
			toast.error("Something was wrong. Try it later", {
				autoClose: 2000,
			});
		}
		return Promise.reject(error);
	}
);
const httpService = {
	get: http.get,
	post: http.post,
	put: http.put,
	delete: http.delete,
	patch: http.patch,
};
export default httpService;
