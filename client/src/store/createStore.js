import { combineReducers, configureStore } from "@reduxjs/toolkit";
import habitsReducer from "./habits";

const rootReducer = combineReducers({
	/* notes: notesReducer, */
	habits: habitsReducer,
});

export function createStore() {
	return configureStore({
		reducer: rootReducer,
	});
}
