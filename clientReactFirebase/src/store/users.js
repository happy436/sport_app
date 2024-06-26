import { createAction, createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";
import localStorageService from "../services/localStorage.service";
import history from "../utils/history";
import generateAuthError from "../utils/generateAuthError";
import { authFirebase } from "../firebase";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { Bounce, toast } from "react-toastify";

const initialState = localStorageService.getAccessToken()
	? {
			entities: null,
			isLoading: true,
			error: null,
			auth: { userId: localStorageService.getUserId() },
			isLoggedIn: true,
	  }
	: {
			entities: null,
			isLoading: false,
			error: null,
			auth: null,
			isLoggedIn: false,
	  };

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		usersRequested: (state) => {
			state.isLoading = true;
		},
		/* usersReceived: (state, action: PayloadAction<any[]>) => {
			state.entities = action.payload;
			state.dataLoaded = true;
			state.isLoading = false;
		}, */
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
		},
		/* userUpdateSuccessed: (state, action: PayloadAction<any>) => {
			const index = state.entities?.findIndex(
				(u) => u._id === action.payload._id
			);
			if (index !== undefined && index >= 0 && state.entities) {
				state.entities[index] = action.payload;
			}
		}, */
		authRequested: (state) => {
			state.error = null;
		},
	},
});

const { reducer: usersReducer, actions } = usersSlice;
const {
	//usersRequested,
	//usersReceived,
	//usersRequestFailed,
	authRequestSuccess,
	//authRequestFailed,
	userCreated,
	userLoggedOut,
	//userUpdateSuccessed,
} = actions;

const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/userCreateRequested");
const createUserFailed = createAction("users/createUserFailed");
//const userUpdateRequested = createAction("users/userUpdateRequested");
//const userUpdateFailed = createAction<string>("users/userUpdateFailed");

export const logIn =
	({ payload }) =>
	async (dispatch) => {
		const { email, password } = payload;
		dispatch(authRequested());
		try {
			const data = await signInWithEmailAndPassword(
				authFirebase,
				email,
				password
			);
			dispatch(authRequestSuccess({ userId: data.user.uid }));
			localStorageService.setTokens(data);
			return true;
		} catch (error) {
			const { code } = error;
			const errorMessage = generateAuthError(code);
			toast.error(errorMessage, {
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
			return false;
		}
	};

export const signUp =
	({ email, password }) =>
	async (dispatch) => {
		dispatch(authRequested());
		try {
			const data = await createUserWithEmailAndPassword(
				authFirebase,
				email,
				password
			);
			localStorageService.setTokens(data);
			dispatch(authRequestSuccess({ userId: data.user.uid }));
			await dispatch(
				createUser({
					_id: data.user.uid,
					email,
				})
			);
			return true;
		} catch (error) {
			const { code } = error;
			const errorMessage = generateAuthError(code);
			toast.error(errorMessage, {
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
			return false;
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

/* export const loadUsersList = (): AppThunk => async (dispatch) => {
	dispatch(usersRequested());
	try {
		const { content } = await userService.get();
		dispatch(usersReceived(content));
	} catch (error) {
		dispatch(usersRequestFailed((error as Error).message));
	}
}; */

/* export const updateUserData =
	(payload): AppThunk =>
	async (dispatch) => {
		dispatch(userUpdateRequested());
		try {
			const { content } = await userService.update(payload);
			dispatch(userUpdateSuccessed(content));
			history.push(`/users/${content._id}`);
		} catch (error) {
			dispatch(userUpdateFailed((error as Error).message));
		}
	}; */

//export const getUsersList = () => (state: RootState) => state.users.entities;
/* export const getCurrentUserData = () => (state: RootState) => {
	return state.users.entities
		? state.users.entities.find((u) => u._id === state.users.auth?.userId)
		: null;
}; */
/* export const getUserById = (userId: string) => (state: RootState) => {
	if (state.users.entities) {
		return state.users.entities.find((u) => u._id === userId);
	}
	return null;
}; */

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getUsersLoadingStatus = () => (state) =>
	state.users.isLoading;
/* export const getCurrentUser = (): AppThunk => async (dispatch) => {
	dispatch(usersRequested());
	try {
		const { content } = await userService.getCurrentUser();
		dispatch(usersReceived(content));
	} catch (error) {
		dispatch(usersRequestFailed((error as Error).message));
	}
}; */
export const getAuthErrors = () => (state) => state.users.error;

export default usersReducer;
