import {configureStore} from '@reduxjs/toolkit';
import LanguageReducer from '../redux/languageSlice';
import AuthReducer from '../redux/authSlice';
import PostReducer from '../redux/postSlice';
import LanguageModalReducer from './languageModalSlice';

export const store = configureStore({
  reducer: {
    language: LanguageReducer,
    languageModal: LanguageModalReducer,
    auth: AuthReducer,
    post: PostReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
