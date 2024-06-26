import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
import { AppThunk, RootState } from "./createStore";

interface AuthState {
	userId: string | null;
}

interface CustomError extends Error {
	code: string;
}

export interface firebaseUser {
	user: {
		uid: string;
		stsTokenManager: { refreshToken: string; accessToken: string };
	};
}

interface UserEntities {
	email: string;
	userId: string;
}

interface UserState {
	entities: UserEntities | null;
	isLoading: boolean;
	error: string | null;
	auth: AuthState | null;
	isLoggedIn: boolean;
}

const initialState: UserState = localStorageService.getAccessToken()
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
		usersRequestFailed: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		authRequestSuccess: (state, action: PayloadAction<AuthState>) => {
			state.auth = action.payload;
			state.isLoggedIn = true;
		},
		authRequestFailed: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
		userCreated: (state, action: PayloadAction<UserEntities>) => {
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
const createUserFailed = createAction<string>("users/createUserFailed");
//const userUpdateRequested = createAction("users/userUpdateRequested");
//const userUpdateFailed = createAction<string>("users/userUpdateFailed");

export const logIn =
	({ payload }: { payload: { email: string; password: string } }): AppThunk =>
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
			const { code } = error as CustomError;
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

/* {
    "user": {
        "uid": "KhgwNstqYFQ7JqlPYTpy5INrSiq1",
        "email": "a@a3.com",
        "emailVerified": false,
        "isAnonymous": false,
        "providerData": [
            {
                "providerId": "password",
                "uid": "a@a3.com",
                "displayName": null,
                "email": "a@a3.com",
                "phoneNumber": null,
                "photoURL": null
            }
        ],
        "stsTokenManager": {
            "refreshToken": "AMf-vBxCzdQIgeKvM3HACld9IELwFcGKOLgYjGmEQbUNNU-Rl2g89jeSZVKV2MCfI1CFK9_24ylU4JzlCVEMTUfuia34JBu879kquzD9Dv2_90UE_obKCTHvGy1HbOaaAqnHSiWQxkRQC4KWpCAqmLJPft4HL237TneyVkBAXuM-OGOe69u1lUzFA-P3FL_g3BlChIMTzfqd",
            "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc5M2Y3N2Q0N2ViOTBiZjRiYTA5YjBiNWFkYzk2ODRlZTg1NzJlZTYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3BvcnQtYXBwLTZmMjg4IiwiYXVkIjoic3BvcnQtYXBwLTZmMjg4IiwiYXV0aF90aW1lIjoxNzE5NDEzNzE1LCJ1c2VyX2lkIjoiS2hnd05zdHFZRlE3SnFsUFlUcHk1SU5yU2lxMSIsInN1YiI6IktoZ3dOc3RxWUZRN0pxbFBZVHB5NUlOclNpcTEiLCJpYXQiOjE3MTk0MTM3MTUsImV4cCI6MTcxOTQxNzMxNSwiZW1haWwiOiJhQGEzLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhQGEzLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.OilnOnREt8Z8uCKAN2yMD2qyYr4F19yOr72gXPinHxnl0wfU1Hyxn6Ie-xGjHrLk4P9T7diFHgBA3SOD5GcHVMCw_u6jR8iNpzibKeluF6lTqiq8Ky7eBJfAVoLULwcrQVuZeXUg3m9pdHqwJk7yuOeaL5IArYj_u0fayTU6mfUjNiI61sk7yQdCFqobFUwJwNaEcMc5b8kralI_W9RW0dWBT9E6uhidpD8c3NHBBgM7QEv9fl0mOVoXe1nXedzrUux6Im1uYqkr2sLg4RfhnDKsY8ts3oDiT_YZwMEX1smCvO0RgkUdtkbt6ygzazKV4HGwKYWCbz8hzTOAS2TSxw",
            "expirationTime": 1719417314560
        },
        "createdAt": "1719413715302",
        "lastLoginAt": "1719413715302",
        "apiKey": "AIzaSyDIPA0v-q38ARnA98QCI6I-jZ9SW6CGKPE",
        "appName": "[DEFAULT]"
    },
    "providerId": null,
    "_tokenResponse": {
        "kind": "identitytoolkit#SignupNewUserResponse",
        "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc5M2Y3N2Q0N2ViOTBiZjRiYTA5YjBiNWFkYzk2ODRlZTg1NzJlZTYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3BvcnQtYXBwLTZmMjg4IiwiYXVkIjoic3BvcnQtYXBwLTZmMjg4IiwiYXV0aF90aW1lIjoxNzE5NDEzNzE1LCJ1c2VyX2lkIjoiS2hnd05zdHFZRlE3SnFsUFlUcHk1SU5yU2lxMSIsInN1YiI6IktoZ3dOc3RxWUZRN0pxbFBZVHB5NUlOclNpcTEiLCJpYXQiOjE3MTk0MTM3MTUsImV4cCI6MTcxOTQxNzMxNSwiZW1haWwiOiJhQGEzLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhQGEzLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.OilnOnREt8Z8uCKAN2yMD2qyYr4F19yOr72gXPinHxnl0wfU1Hyxn6Ie-xGjHrLk4P9T7diFHgBA3SOD5GcHVMCw_u6jR8iNpzibKeluF6lTqiq8Ky7eBJfAVoLULwcrQVuZeXUg3m9pdHqwJk7yuOeaL5IArYj_u0fayTU6mfUjNiI61sk7yQdCFqobFUwJwNaEcMc5b8kralI_W9RW0dWBT9E6uhidpD8c3NHBBgM7QEv9fl0mOVoXe1nXedzrUux6Im1uYqkr2sLg4RfhnDKsY8ts3oDiT_YZwMEX1smCvO0RgkUdtkbt6ygzazKV4HGwKYWCbz8hzTOAS2TSxw",
        "email": "a@a3.com",
        "refreshToken": "AMf-vBxCzdQIgeKvM3HACld9IELwFcGKOLgYjGmEQbUNNU-Rl2g89jeSZVKV2MCfI1CFK9_24ylU4JzlCVEMTUfuia34JBu879kquzD9Dv2_90UE_obKCTHvGy1HbOaaAqnHSiWQxkRQC4KWpCAqmLJPft4HL237TneyVkBAXuM-OGOe69u1lUzFA-P3FL_g3BlChIMTzfqd",
        "expiresIn": "3600",
        "localId": "KhgwNstqYFQ7JqlPYTpy5INrSiq1"
    },
    "operationType": "signIn"
} */

export const signUp =
	({ email, password }: { email: string; password: string }): AppThunk =>
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
			const { code } = error as CustomError;
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

export const logOut = (): AppThunk => (dispatch) => {
	localStorageService.removeAuthData();
	dispatch(userLoggedOut());
	history.push("/");
};

function createUser(payload): AppThunk {
	return async function (dispatch) {
		dispatch(userCreateRequested());
		try {
			const data = await userService.create(payload);
			dispatch(userCreated(data));
			history.push("/home");
		} catch (error) {
			dispatch(createUserFailed((error as Error).message));
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

export const getIsLoggedIn = () => (state: RootState) => state.users.isLoggedIn;
export const getUsersLoadingStatus = () => (state: RootState) =>
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
export const getAuthErrors = () => (state: RootState) => state.users.error;

export default usersReducer;
