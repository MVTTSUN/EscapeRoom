import { createSlice } from '@reduxjs/toolkit';
import { AuthStatus, NameSlice } from '../../const';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';

const initialState = {
  authStatus: AuthStatus.Unknown
};

const authProcess = createSlice({
  name: NameSlice.Auth,
  initialState,
  reducers: {
    setAuthStatus(state, action) {
      state.authStatus = action.payload as AuthStatus;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loginAction.fulfilled, (state) => {
        state.authStatus = AuthStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      })
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authStatus = AuthStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      });
  }
});

const authReducer = authProcess.reducer;

export const { setAuthStatus } = authProcess.actions;

export { authReducer };
