import { APIGatewayProxyResult } from 'aws-lambda';

export function createResponse(statusCode: number, body: any = null): APIGatewayProxyResult {
  return {
    statusCode,
    body: body ? JSON.stringify(body) : '',
  };
}
