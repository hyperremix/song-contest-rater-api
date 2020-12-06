export interface Act {
  id?: string;
  artistName: string;
  songName: string;
}

export const actSchema = {
  required: ['artistName', 'songName'],
  properties: {
    id: {
      type: 'string',
    },
    artistName: {
      type: 'string',
    },
    songName: {
      type: 'string',
    },
  },
};

export const defaultAct: Act = {
  id: '84ce3ed6-a479-4ba4-86e1-d053638fd8a1',
  artistName: 'John Doe',
  songName: 'I am John Doe',
};
