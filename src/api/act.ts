import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import DynamoDB from 'aws-sdk/clients/dynamodb';
import { Act } from 'src/shared/model/act';
import { v4 as uuid } from 'uuid';
import { createResponse } from './shared/response.factory';

const databaseClient = new DynamoDB.DocumentClient();

export async function createAct(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
  try {
    const act: Act = JSON.parse(event.body);
    act.id = uuid();
    await databaseClient.put({ TableName: process.env.ACTS_TABLE, Item: act }).promise();
    return createResponse(200);
  } catch (error) {
    return createResponse(500, event);
  }
}

export async function listActs(): Promise<APIGatewayProxyResult> {
  try {
    const result = await databaseClient.scan({ TableName: process.env.ACTS_TABLE }).promise();
    return createResponse(200, result.Items);
  } catch (error) {
    return createResponse(500, { message: error?.message });
  }
}
