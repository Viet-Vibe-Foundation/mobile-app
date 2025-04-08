import {configureStore} from '@reduxjs/toolkit';
import LanguageReducer from '../redux/languageSlice';
export const store = configureStore({
  reducer: {
    language: LanguageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
