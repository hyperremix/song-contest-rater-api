import { DataMapper } from '@aws/dynamodb-data-mapper/build/DataMapper';
import { DynamoDB } from 'aws-sdk/clients/all';

const DYNAMODB_ENDPOINT = process.env.SONG_CONTEST_RATER_DYNAMODB_ENDPOINT;
const IS_OFFLINE = process.env.IS_OFFLINE;

export function createDatabaseClient(): DataMapper {
  if (IS_OFFLINE !== 'true') {
    return new DataMapper({ client: new DynamoDB() });
  }

  return new DataMapper({
    client: new DynamoDB({ region: 'localhost', endpoint: DYNAMODB_ENDPOINT }),
  });
}
