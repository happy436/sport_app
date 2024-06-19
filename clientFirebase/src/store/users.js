import { createAction, createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import history from "../utils/history";
import generateAuthError from "../utils/generateAuthError";
import {authFirebase} from "../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Bounce, toast } from "react-toastify";

const initialState = localStorageService.getAccessToken()
	? {
			entities: null,
			isLoading: true,
			error: null,
			auth: { userId: localStorageService.getUserId() },
			isLoggedIn: true,
			dataLoaded: false,
	  }
	: {
			entities: null,
			isLoading: false,
			error: null,
			auth: null,
			isLoggedIn: false,
			dataLoaded: false,
	  };

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		usersRequested: (state) => {
			state.isLoading = true;
		},
		usersReceived: (state, action) => {
			state.entities = action.payload;
			state.dataLoaded = true;
			state.isLoading = false;
		},
		usersRequestFailed: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		authRequestSuccess: (state, action) => {
			state.auth = action.payload;
			state.isLoggedIn = true;
		},
		authRequestFailed: (state, action) => {
			state.error = action.payload;
		},
		userCreated: (state, action) => {
			state.entities = action.payload;
		},
		userLoggedOut: (state) => {
			state.entities = null;
			state.isLoggedIn = false;
			state.auth = null;
			state.dataLoaded = false;
		},
		userUpdateSuccessed: (state, action) => {
			state.entities[
				state.entities.findIndex((u) => u._id === action.payload._id)
			] = action.payload;
		},
		authRequested: (state) => {
			state.error = null;
		},
	},
});

const { reducer: usersReducer, actions } = usersSlice;
const {
	usersRequested,
	usersReceived,
	usersRequestFailed,
	authRequestSuccess,
	authRequestFailed,
	userCreated,
	userLoggedOut,
	userUpdateSuccessed,
} = actions;

const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/userCreateRequested");
const createUserFailed = createAction("users/createUserFailed");
const userUpdateRequested = createAction("users/userUpdateRequested");
const userUpdateFailed = createAction("users/userUpdateFailed");

export const logIn =
	({ payload }) =>
	async (dispatch) => {
		const { email, password } = payload;
		dispatch(authRequested());
		try {
            const data = await signInWithEmailAndPassword(authFirebase, email, password)
			dispatch(authRequestSuccess({ userId: data.user.uid }));
			localStorageService.setTokens(data.user);
		} catch (error) {
            const {code, message} = error
            
            toast.error(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });

			//const { code, message } = error.response.data.error;
			if (code === 400) {
				const errorMessage = generateAuthError(message);
				dispatch(authRequestFailed(errorMessage));
			} else {
				dispatch(authRequestFailed(error.message));
			}
		}
	};

export const signUp =
	({ email, password, ...rest }) =>
	async (dispatch) => {
		dispatch(authRequested());
		try {
			const data = await createUserWithEmailAndPassword(authFirebase, email, password)
			localStorageService.setTokens(data.user);
			dispatch(authRequestSuccess({ userId: data.user.uid }));
            // TODO делать запись в базе данных firebase для нового пользователя
			await dispatch(
				createUser({
					_id: data.user.uid,
					email,
					...rest,
				})
			);
		} catch (error) {
			dispatch(authRequestFailed(error.message));
		}
	};
export const logOut = () => (dispatch) => {
	localStorageService.removeAuthData();
	dispatch(userLoggedOut());
	history.push("/");
};

function createUser(payload) {
	return async function (dispatch) {
		dispatch(userCreateRequested());
		try {
			const data = await userService.create(payload);
			dispatch(userCreated(data));
			history.push("/home");
		} catch (error) {
			dispatch(createUserFailed(error.message));
		}
	};
}

export const loadUsersList = () => async (dispatch) => {
	dispatch(usersRequested());
	try {
		const { content } = await userService.get();
		dispatch(usersReceived(content));
	} catch (error) {
		dispatch(usersRequestFailed(error.message));
	}
};
export const updateUserData = (payload) => async (dispatch) => {
	dispatch(userUpdateRequested());
	try {
		const { content } = await userService.update(payload);
		dispatch(userUpdateSuccessed(content));
		history.push(`/users/${content._id}`);
	} catch (error) {
		dispatch(userUpdateFailed(error.message));
	}
};

export const getUsersList = () => (state) => state.users.entities;
export const getCurrentUserData = () => (state) => {
	return state.users.entities
		? state.users.entities.find((u) => u._id === state.users.auth.userId)
		: null;
};
export const getUserById = (userId) => (state) => {
	if (state.users.entities) {
		return state.users.entities.find((u) => u._id === userId);
	}
};

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getCurrentUser = () => async (dispatch) => {
	dispatch(usersRequested());
	try {
		const { content } = await userService.getCurrentUser();
		dispatch(usersReceived(content));
	} catch (error) {
		dispatch(usersRequestFailed(error.message));
	}
};
export const getAuthErrors = () => (state) => state.users.error;

export default usersReducer;
