import { combineReducers, configureStore } from "@reduxjs/toolkit";
import habitsReducer from "./habits";
import measurementsReducer from "./measurements";

const rootReducer = combineReducers({
	/* notes: notesReducer, */
	habits: habitsReducer,
    measurements: measurementsReducer
});

export function createStore() {
	return configureStore({
		reducer: rootReducer,
	});
}
