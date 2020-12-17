import { DataMapper } from '@aws/dynamodb-data-mapper';
import { ReflectiveInjector } from 'injection-js';
import 'reflect-metadata';
import { createDataMapper } from 'src/shared/data-access/database-client.factory';
import { DatabaseClient } from 'src/shared/data-access/database.client';
import { CompetitionController } from './api/competition.controller';
import {
  CompetitionDocumentMapper,
  COMPETITION_DOCUMENT_MAPPER,
} from './data-access/competition-document.mapper';
import { CompetitionRepository } from './data-access/competition.repository';

export function getCompetitionController(): CompetitionController {
  return ReflectiveInjector.resolveAndCreate([
    { provide: DataMapper, useFactory: createDataMapper },
    DatabaseClient,
    { provide: COMPETITION_DOCUMENT_MAPPER, useClass: CompetitionDocumentMapper },
    CompetitionRepository,
    CompetitionController,
  ]).get(CompetitionController);
}
