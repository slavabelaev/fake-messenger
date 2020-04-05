import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./rootReducer";

export interface SettingsState {
    darkThemeEnabled: boolean;
}

const initialState: SettingsState = {
    darkThemeEnabled: false
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        enableDarkTheme(state, action: PayloadAction<boolean>) {
            state.darkThemeEnabled = action.payload;
        }
    }
});

export const selectSettings = (state: RootState) => state.settings;

export const {
    enableDarkTheme
} = settingsSlice.actions;

const settingsReducer = settingsSlice.reducer;

export default settingsReducer;
