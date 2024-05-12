import { createSlice, nanoid } from "@reduxjs/toolkit";
/* import notesService from "../services/notes.service";
import localStorageService from "../services/localStorage.service"; */
import { toast } from "react-toastify";

const habitsSlice = createSlice({
    name: "habits",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        habitsRequested: (state) => {
            state.isLoading = true;
        },
        habitsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        habitsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        addHabit: (state, action) => {
            state.entities.push(action.payload);
            state.isLoading = false;
        },
        deleteHabit: (state, action) => {
            state.entities.splice(
                state.entities.findIndex((c) => c._id === action.payload.id),
                1
            );
            state.isLoading = false;
        },
        editHabit: (state, action) => {
            const index = state.entities.findIndex(
                (c) => c._id === action.payload._id
            );
            state.entities[index] = action.payload;
            state.isLoading = false;
        },
    }
});

const { reducer: habitsReducer, actions } = habitsSlice;
const {
    habitsRequested,
    habitsReceived,
    habitsRequestFailed,
    addHabit,
    deleteHabit,
    editHabit,
} = actions;

export const loadHabitsList = () => async (dispatch) => {
    /* const userId = localStorageService.getUserId(); */
    dispatch(habitsRequested());
    try {
        /* const { content } = await habitsService.getHabits(userId); */
        dispatch(habitsReceived(content));
    } catch (error) {
        dispatch(habitsRequestFailed(error.message));
    }
};

export const createHabit = (data) => async (dispatch) => {
    const note = {
        ...data,
        _id: nanoid(),
        created_at: Date.now(),
        userId: /* localStorageService.getUserId() */nanoid()
    };
    dispatch(habitsRequested());
    try {
        /* const { content } = await habitsService.createNote(note); */
        dispatch(addHabit(note));
    } catch (error) {
        dispatch(habitsRequestFailed(error.message));
    }
};

export const editHabitData = (payload) => async (dispatch) => {
    dispatch(habitsRequested());
    try {
        const { content } = await habitsService.update(payload);
        if (typeof content === "object") {
            toast.success("Task edit successful", { autoClose: 2000 });
        }
        dispatch(editHabit(payload));
    } catch (error) {
        dispatch(habitsRequestFailed(error.message));
    }
};

export const removeHabit = (id) => async (dispatch) => {
    dispatch(habitsRequested());
    try {
        /* const { content } = await habitsService.removeNote(id); */
        if (!content) {
            toast.success("Note deleted successfully", { autoClose: 2000 });
            dispatch(deleteHabit({ id }));
        }
    } catch (error) {
        dispatch(habitsRequestFailed(error.message));
    }
};

export const getHabits = () => (state) => state.habits.entities;
export const getHabitsLoadingStatus = () => (state) => state.habits.isLoading;
export const getHabitById = (id) => (state) => {
    if (state.habits.entities) {
        return state.habits.entities.find((n) => n._id === id);
    }
};

export default habitsReducer;
