import { createSelector } from '@reduxjs/toolkit';
import { LEVELS_QUESTS, NameSlice, TYPES_QUESTS } from '../../const';
import { State } from '../../types/state';
import { QuestData } from '../../types/quest-data';

const getTypeQuest = (state: Pick<State, NameSlice.Quests>) => state[NameSlice.Quests].typeQuest;
const getLevelQuest = (state: Pick<State, NameSlice.Quests>) => state[NameSlice.Quests].levelQuest;
const getIsLoading = (state: Pick<State, NameSlice.Quests>) => state[NameSlice.Quests].isLoading;
const getQuests = (state: Pick<State, NameSlice.Quests>) => state[NameSlice.Quests].quests;
const getCurrentQuest = (state: Pick<State, NameSlice.Quests>) => state[NameSlice.Quests].currentQuest;
const getFilteredQuests = createSelector(
  [getQuests, getTypeQuest, getLevelQuest],
  (quests: QuestData[], typeQuest: string, levelQuest: string) =>
    quests.filter((quest) =>
      (typeQuest === TYPES_QUESTS[0].id || quest.type === typeQuest)
      && (levelQuest === LEVELS_QUESTS[0].id || quest.level === levelQuest))
);
const getQuestBookingInfo = (state: Pick<State, NameSlice.Quests>) => state[NameSlice.Quests].questBookingInfo;
const getMyQuests = (state: Pick<State, NameSlice.Quests>) => state[NameSlice.Quests].myQuests;

export {
  getQuests,
  getCurrentQuest,
  getFilteredQuests,
  getIsLoading,
  getTypeQuest,
  getLevelQuest,
  getQuestBookingInfo,
  getMyQuests
};
