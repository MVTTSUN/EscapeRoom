type QuestData = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: 'easy' | 'medium' | 'hard';
  type: 'adventures' | 'horror' | 'mystic' | 'detective' | 'sci-fi';
  peopleMinMax: [number, number];
  description: undefined | string;
  coverImg: undefined | string;
  coverImgWebp: undefined | string;
}

type QuestBookingInfo = {
  id: string;
  location: {
    address: string;
    coords: [number, number];
  };
  slots: {
    today: [{
      time: string;
      isAvailable: boolean;
    }];
    tomorrow: [{
      time: string;
      isAvailable: boolean;
    }];
  };
}

type MyQuest = {
  date: 'today' | 'tomorrow';
  time: string;
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
  id: string;
  location: {
    address: string;
    coords: [number, number];
  };
  quest: {
    id: string;
    title: string;
    previewImg: string;
    previewImgWebp: string;
    level: 'easy' | 'medium' | 'hard';
    type: 'adventures' | 'horror' | 'mystic' | 'detective' | 'sci-fi';
    peopleMinMax: [number, number];
  };
}

export type { QuestData, QuestBookingInfo, MyQuest };
