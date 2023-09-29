import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../const';
import { AuthData } from '../types/auth-data';
import { AxiosInstance } from 'axios';
import { removeToken, setToken } from '../services/token';
import { UserData } from '../types/user-data';
import { browserHistory } from '../utils/browser-history';
import { QuestBookingInfo, QuestData } from '../types/quest-data';

const loginAction = createAsyncThunk<void, AuthData, {
  extra: AxiosInstance;
}>(
  'auth/login',
  async ({ email, password }, { extra: api }) => {
    const { data: { token } } = await api.post<UserData>(APIRoute.Login, { email, password });

    setToken(token);
    browserHistory.back();
  }
);

const logoutAction = createAsyncThunk<void, undefined, {
  extra: AxiosInstance;
}>(
  'auth/logout',
  async (_, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    removeToken();
  }
);

const checkAuthAction = createAsyncThunk<void, undefined, {
  extra: AxiosInstance;
}>(
  'auth/checkAuth',
  async (_, { extra: api }) => {
    await api.get(APIRoute.Login);
  }
);

const getQuestsAction = createAsyncThunk<QuestData[], undefined, {
  extra: AxiosInstance;
}>(
  'data/getQuests',
  async (_, { extra: api }) => {
    const { data } = await api.get<QuestData[]>(APIRoute.Quest);

    return data;
  }
);

const getQuestAction = createAsyncThunk<QuestData, string, {
  extra: AxiosInstance;
}>(
  'data/getQuest',
  async (id, { extra: api }) => {
    const { data } = await api.get<QuestData>(`${APIRoute.Quest}/${id}`);

    return data;
  }
);

const getQuestBookingInfoAction = createAsyncThunk<QuestBookingInfo[], string, {
  extra: AxiosInstance;
}>(
  'data/getQuestBookingInfo',
  async (id, { extra: api }) => {
    const { data } = await api.get<QuestBookingInfo[]>(`${APIRoute.Quest}/${id}${APIRoute.Booking}`);

    return data;
  }
);

const postQuestBookingAction = createAsyncThunk<void, string, {
  extra: AxiosInstance;
}>(
  'data/getQuestBookingInfo',
  async (id, { extra: api }) => {
    await api.post(`${APIRoute.Quest}/${id}${APIRoute.Booking}`);
  }
);

export {
  loginAction,
  logoutAction,
  checkAuthAction,
  getQuestsAction,
  getQuestAction,
  getQuestBookingInfoAction,
  postQuestBookingAction
};
