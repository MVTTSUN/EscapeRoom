import { AuthStatus, NameSlice } from '../../const';
import { State } from '../../types/state';

const getAuthStatus = (state: Pick<State, NameSlice.Auth>) => state[NameSlice.Auth].authStatus;
const getIsAuthStatus = (state: Pick<State, NameSlice.Auth>) => state[NameSlice.Auth].authStatus !== AuthStatus.Unknown;

export { getAuthStatus, getIsAuthStatus };
