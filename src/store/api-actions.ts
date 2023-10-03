import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, BrowserRoute } from '../const';
import { AuthData } from '../types/auth-data';
import { AxiosInstance } from 'axios';
import { removeToken, setToken } from '../services/token';
import { UserData } from '../types/user-data';
import { browserHistory } from '../utils/browser-history';
import { MyQuest, QuestBookingInfo, QuestData } from '../types/quest-data';
import { BookingData } from '../types/booking-data';

const loginAction = createAsyncThunk<void, AuthData & { from: string }, {
  extra: AxiosInstance;
}>(
  'auth/login',
  async ({ email, password, from }, { extra: api }) => {
    const { data: { token } } = await api.post<UserData>(APIRoute.Login, { email, password });

    setToken(token);
    browserHistory.replace(from);
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

const postQuestBookingAction = createAsyncThunk<void, {id: string; data: BookingData}, {
  extra: AxiosInstance;
}>(
  'data/getQuestBookingInfo',
  async ({ id, data }, { extra: api }) => {
    await api.post(`${APIRoute.Quest}/${id}${APIRoute.Booking}`, data);
    browserHistory.push(BrowserRoute.MyQuests);
  }
);

const getMyQuestsAction = createAsyncThunk<MyQuest[], undefined, {
  extra: AxiosInstance;
}>(
  'data/getMyQuests',
  async (_, { extra: api }) => {
    const { data } = await api.get<MyQuest[]>(APIRoute.MyQuests);

    return data;
  }
);

const deleteMyQuestAction = createAsyncThunk<void, string, {
  extra: AxiosInstance;
}>(
  'data/deleteMyQuest',
  async (id, { extra: api }) => {
    await api.delete(`${APIRoute.MyQuests}/${id}`);
  }
);

export {
  loginAction,
  logoutAction,
  checkAuthAction,
  getQuestsAction,
  getQuestAction,
  getQuestBookingInfoAction,
  postQuestBookingAction,
  getMyQuestsAction,
  deleteMyQuestAction
};
