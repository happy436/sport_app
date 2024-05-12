import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    /* notes: notesReducer, */
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
