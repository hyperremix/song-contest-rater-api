import { DataMapper } from '@aws/dynamodb-data-mapper';
import { S3 } from 'aws-sdk';
import { ReflectiveInjector } from 'injection-js';
import 'reflect-metadata';
import { createDataMapper } from 'src/shared/data-access/database-client.factory';
import { DatabaseClient } from 'src/shared/data-access/database.client';
import { UserController } from './api/user.controller';
import { S3RequestFactory } from './data-access/s3-request.factory';
import { S3Client } from './data-access/s3.client';
import { createS3 } from './data-access/s3.factory';
import { UserDocumentMapper } from './data-access/user-document.mapper';
import { UserRepository } from './data-access/user.repository';

export function getUserController(): UserController {
  return ReflectiveInjector.resolveAndCreate([
    { provide: DataMapper, useFactory: createDataMapper },
    DatabaseClient,
    UserDocumentMapper,
    UserRepository,
    UserController,
    { provide: S3, useFactory: createS3 },
    S3RequestFactory,
    S3Client,
  ]).get(UserController);
}
