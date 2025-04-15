import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {storagePropertiesName} from 'src/constants';
import {mmkvStorage} from '../mmvkStorage';
import {verifyToken} from 'src/utils/jwtUtil';

export interface AuthState {
  isAuth: boolean;
  authToken: string | null;
}

const initialState: AuthState = {
  isAuth: verifyToken(mmkvStorage.getString(storagePropertiesName.authToken)),
  authToken: mmkvStorage.getString(storagePropertiesName.authToken) || null,
};

export const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      state.isAuth = action.payload.isAuth;
      state.authToken = action.payload.authToken;
    },
    logout: state => {
      state.isAuth = false;
      state.authToken = null;
    },
  },
});

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;
