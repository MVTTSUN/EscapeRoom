type QuestData = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: 'easy' | 'medium' | 'hard';
  type: 'adventures' | 'horror' | 'mystic' | 'detective' | 'sci-fi';
  peopleMinMax: number[];
  description: undefined | string;
  coverImg: undefined | string;
  coverImgWebp: undefined | string;
}

export type { QuestData };
