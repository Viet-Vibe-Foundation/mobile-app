import {configureStore} from '@reduxjs/toolkit';
import LanguageReducer from '../redux/languageSlice';
import AuthReducer from '../redux/authSlice';
export const store = configureStore({
  reducer: {
    language: LanguageReducer,
    auth: AuthReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
