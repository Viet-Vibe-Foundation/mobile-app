import {createSlice} from '@reduxjs/toolkit';
import {Appearance} from 'react-native';

export interface ThemeState {
  value: string;
}

const initialState: ThemeState = {
  value: Appearance.getColorScheme() || 'light',
};

export const themeSlice = createSlice({
  name: 'Theme',
  initialState,
  reducers: {
    toggleTheme: state => {
      state.value = state.value === 'light' ? 'dark' : 'light';
    },
  },
});

export const {toggleTheme} = themeSlice.actions;

export default themeSlice.reducer;
