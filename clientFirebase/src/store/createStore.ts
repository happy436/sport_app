import {
	Action,
	combineReducers,
	configureStore,
	ThunkAction,
} from "@reduxjs/toolkit";
import habitsReducer from "./habits";
import measurementsReducer from "./measurements";
import usersReducer from "./users";

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
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
