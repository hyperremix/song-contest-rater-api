import { userSchema } from '@hyperremix/song-contest-rater-model';
import validator from '@middy/validator';
import { S3Event } from 'aws-lambda';
import { adminAuthorizer } from 'src/shared/api/admin-authorizer.middleware';
import { createInputSchema } from 'src/shared/api/schema.factory';
import { middify } from 'src/shared/api/third-party.middleware';
import { createResponse } from '../shared/api/response.factory';
import { userAuthorizer } from './api/user-authorizer.middleware';
import { getUserController } from './user-context';

export const createUser = middify(async ({ body }) => {
  const result = await getUserController().create(body);
  return createResponse(201, result);
}).use([validator({ inputSchema: createInputSchema(userSchema) })]);

export const listUsers = middify(async ({ multiValueQueryStringParameters }) => {
  const result = multiValueQueryStringParameters?.ids
    ? await getUserController().query(multiValueQueryStringParameters.ids)
    : await getUserController().list();
  return createResponse(200, result);
}).use([adminAuthorizer()]);

export const getUser = middify(async ({ pathParameters: { id } }) => {
  const result = await getUserController().get(id);
  return createResponse(200, result);
}).use([userAuthorizer()]);

export const updateUser = middify(async ({ body, pathParameters: { id } }) => {
  const bodyWithId = { ...body, id };
  const result = await getUserController().update(bodyWithId);
  return createResponse(200, result);
}).use([userAuthorizer(), validator({ inputSchema: createInputSchema(userSchema) })]);

export const deleteUser = middify(async ({ pathParameters: { id } }) => {
  const result = await getUserController().delete(id);
  return createResponse(200, result);
}).use([userAuthorizer()]);

export const initiateAvatarUpload = middify(
  async ({ pathParameters: { id }, body: { contentType } }) => {
    const result = await getUserController().initiateAvatarUpload(id, contentType);
    return createResponse(201, result);
  }
).use([userAuthorizer()]);

export const processUploadedAvatar = async ({ Records }: S3Event) => {
  const s3Record = Records[0].s3;
  await getUserController().processUploadedAvatar(s3Record.bucket.name, s3Record.object.key);
};
