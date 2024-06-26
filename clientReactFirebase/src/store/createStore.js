import {
	combineReducers,
	configureStore,
} from "@reduxjs/toolkit";
import habitsReducer from "./habits";
import measurementsReducer from "./measurements";
import usersReducer from "./users";

const rootReducer = combineReducers({
	habits: habitsReducer,
	measurements: measurementsReducer,
	users: usersReducer,
});

const store = configureStore({
	reducer: rootReducer,
});

export default store;
