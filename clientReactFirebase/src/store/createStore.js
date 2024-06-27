import { combineReducers, configureStore } from "@reduxjs/toolkit";
import habitsReducer from "./habits";
import measurementsReducer from "./measurements";
import usersReducer from "./users";

const rootReducer = combineReducers({
	habits: habitsReducer,
	measurements: measurementsReducer,
	users: usersReducer,
});

export function createStore() {
	return configureStore({
		reducer: rootReducer,
	});
}