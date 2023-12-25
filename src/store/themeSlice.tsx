import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { darkTheme, lightTheme } from "../data/theme";
import { ThemeType } from "../types/types";

export interface ThemeState {
	value: ThemeType;
}

const initialState: ThemeState = {
	value: darkTheme,
};

export const themeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		changeTheme: (state, action: PayloadAction<string>) => {
			switch (action.payload) {
				case "light":
					state.value = lightTheme;
					break;
				case "dark":
					state.value = darkTheme;
					break;
				default:
					state.value = lightTheme;
					break;
			}
		},
	},
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
