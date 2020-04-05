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
        setStatusMessage(state, action: PayloadAction<StatusState['message']>) {
            state.message = action.payload;
        },
        setStatusError(state, action: PayloadAction<StatusState['message']>) {
            state.message = action.payload;
            state.error = true;
        },
        resetStatus(state) {
            state.message = null;
            state.error = false;
        }
    }
});

export const selectStatus = (state: RootState) => state.status;

export const {
    setStatusMessage,
    setStatusError,
    resetStatus
} = statusSlice.actions;

const statusReducer = statusSlice.reducer;
export default statusReducer;