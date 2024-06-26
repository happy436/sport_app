import {
	Action,
	combineReducers,
	configureStore,
	ThunkAction,
    UnknownAction,
} from "@reduxjs/toolkit";
import habitsReducer from "./habits";
import measurementsReducer from "./measurements";
import usersReducer from "./users";

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
    UnknownAction,
	Action<string>
>;
export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
	habits: habitsReducer,
	measurements: measurementsReducer,
	users: usersReducer,
});

const store = configureStore({
	reducer: rootReducer,
});

export default store;
