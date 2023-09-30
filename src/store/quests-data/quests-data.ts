import { createSlice } from '@reduxjs/toolkit';
import { LEVELS_QUESTS, NameSlice, TYPES_QUESTS } from '../../const';
import { getMyQuestsAction, getQuestAction, getQuestBookingInfoAction, getQuestsAction } from '../api-actions';
import { MyQuest, QuestBookingInfo, QuestData } from '../../types/quest-data';

const initialState = {
  typeQuest: TYPES_QUESTS[0].id,
  levelQuest: LEVELS_QUESTS[0].id,
  quests: [] as QuestData[],
  currentQuest: {} as QuestData,
  isLoading: false,
  questBookingInfo: [] as QuestBookingInfo[],
  myQuests: [] as MyQuest[],
};

const questsData = createSlice({
  name: NameSlice.Quests,
  initialState,
  reducers: {
    setTypeQuest(state, action) {
      state.typeQuest = action.payload as string;
    },
    setLevelQuest(state, action) {
      state.levelQuest = action.payload as string;
    },
    resetTypeAndLevel(state) {
      state.typeQuest = TYPES_QUESTS[0].id;
      state.levelQuest = LEVELS_QUESTS[0].id;
    },
    resetCurrentQuest(state) {
      state.currentQuest = {} as QuestData;
    },
    resetQuestBookingInfo(state) {
      state.questBookingInfo = [] as QuestBookingInfo[];
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getQuestsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuestsAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quests = action.payload;
      })
      .addCase(getQuestsAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getQuestAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuestAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentQuest = action.payload;
      })
      .addCase(getQuestAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getQuestBookingInfoAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuestBookingInfoAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.questBookingInfo = action.payload;
      })
      .addCase(getQuestBookingInfoAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getMyQuestsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyQuestsAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myQuests = action.payload;
      })
      .addCase(getMyQuestsAction.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

const questsReducer = questsData.reducer;

export const { setTypeQuest, setLevelQuest, resetTypeAndLevel, resetCurrentQuest, resetQuestBookingInfo } = questsData.actions;

export { questsReducer };
