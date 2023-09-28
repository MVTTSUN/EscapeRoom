import { createSlice } from '@reduxjs/toolkit';
import { LEVELS_QUESTS, NameSlice, TYPES_QUESTS } from '../../const';
import { getQuestAction, getQuestsAction } from '../api-actions';
import { QuestData } from '../../types/quest-data';

const initialState = {
  typeQuest: TYPES_QUESTS[0].id,
  levelQuest: LEVELS_QUESTS[0].id,
  quests: [] as QuestData[],
  currentQuest: {} as QuestData,
  isLoading: false
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
      });
  }
});

const questsReducer = questsData.reducer;

export const { setTypeQuest, setLevelQuest, resetTypeAndLevel } = questsData.actions;

export { questsReducer };
