import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import i18next from 'i18next';

export interface LanguageState {
  value: string;
}

const initialState: LanguageState = {
  value: i18next.language || 'en',
};

export const languageSlice = createSlice({
  name: 'Language',
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const {changeLanguage} = languageSlice.actions;

export default languageSlice.reducer;
