import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./rootReducer";

export interface StatusState {
    message: string | null;
    autoHideDuration: number;
    error: boolean;
}

const initialState: StatusState = {
    message: null,
    autoHideDuration: 5000,
    error: false
};

const statusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {
        setMessage(state, action: PayloadAction<StatusState['message']>) {
            state.message = action.payload;
        },
        setError(state, action: PayloadAction<StatusState['message']>) {
            state.message = action.payload;
            state.error = true;
        },
        reset(state) {
            state.message = null;
            state.error = false;
        }
    }
});

export const selectStatus = (state: RootState) => state.status;

export const {
    setMessage: setStatusMessage,
    setError: setStatusError,
    reset: resetStatus
} = statusSlice.actions;

const statusReducer = statusSlice.reducer;
export default statusReducer;