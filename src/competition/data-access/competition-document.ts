import { attribute, autoGeneratedHashKey, table } from '@aws/dynamodb-data-mapper-annotations';

@table(process.env.SONG_CONTEST_RATER_COMPETITIONS_TABLE)
export class CompetitionDocument {
  @autoGeneratedHashKey()
  id: string;
  @attribute()
  description: string;
  @attribute()
  cityName: string;
  @attribute()
  countryName: string;
  @attribute({ defaultProvider: () => new Date() })
  startTime: Date;
  @attribute()
  imageUrl: string;
  @attribute()
  actIds: string[];
}

export const defaultCompetitionDocument: CompetitionDocument = {
  id: '84ce3ed6-a479-4ba4-86e1-d053638fd8a1',
  description: 'Quarterfinal',
  cityName: 'Stockholm',
  countryName: 'Sweden',
  startTime: new Date(),
  imageUrl: 'https://imageurl.example.com/img.jpg',
  actIds: ['84ce3ed6-a479-4ba4-86e1-d053638fd8a1'],
};