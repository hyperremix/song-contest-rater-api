export interface Act {
  id?: string;
  artistName: string;
  songName: string;
}

export const actBaseSchema = {
  required: ['artistName', 'songName'],
  properties: {
    artistName: {
      type: 'string',
    },
    songName: {
      type: 'string',
    },
  },
};
