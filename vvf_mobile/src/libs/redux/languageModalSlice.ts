import {createSlice} from '@reduxjs/toolkit';

export interface LanguageModalState {
  isOpen: boolean;
}

const initialState: LanguageModalState = {
  isOpen: false,
};

export const languageModalSlice = createSlice({
  name: 'LanguageModal',
  initialState,
  reducers: {
    toggleLanguageModal: state => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const {toggleLanguageModal} = languageModalSlice.actions;

export default languageModalSlice.reducer;
