import { attribute, hashKey, table } from '@aws/dynamodb-data-mapper-annotations';

@table(process.env.SONG_CONTEST_RATER_USERS_TABLE)
export class UserDocument {
  @hashKey()
  id: string;
  @attribute()
  firstname: string;
  @attribute()
  lastname: string;
  @attribute()
  email: string;
  @attribute()
  avatarUrl: string;
}

export const defaultUserDocument: UserDocument = {
  id: '84ce3ed6-a479-4ba4-86e1-d053638fd8a1',
  firstname: 'John',
  lastname: 'Doe',
  email: 'john.doe@songcontestrater.com',
  avatarUrl: 'songcontestrater.com/logo192.png',
};
