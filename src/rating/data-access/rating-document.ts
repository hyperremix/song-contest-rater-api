import { attribute, hashKey, table } from '@aws/dynamodb-data-mapper-annotations';

@table(process.env.SONG_CONTEST_RATER_RATINGS_TABLE)
export class RatingDocument {
  @hashKey()
  id?: string;
  @attribute()
  userId: string;
  @attribute()
  competitionId: string;
  @attribute()
  actId: string;
  @attribute()
  song: number;
  @attribute()
  singing: number;
  @attribute()
  show: number;
  @attribute()
  looks: number;
  @attribute()
  clothes: number;
}

export const defaultRatingDocument: RatingDocument = {
  id: '84ce3ed6-a479-4ba4-86e1-d053638fd8a1',
  userId: '84ce3ed6-a479-4ba4-86e1-d053638fd8a1',
  competitionId: '84ce3ed6-a479-4ba4-86e1-d053638fd8a1',
  actId: '84ce3ed6-a479-4ba4-86e1-d053638fd8a1',
  song: 1,
  singing: 2,
  show: 3,
  looks: 4,
  clothes: 5,
};
