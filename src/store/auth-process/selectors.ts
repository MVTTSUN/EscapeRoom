import { NameSlice } from '../../const';
import { State } from '../../types/state';

const getAuthStatus = (state: Pick<State, NameSlice.Auth>) => state[NameSlice.Auth].authStatus;

export { getAuthStatus };
