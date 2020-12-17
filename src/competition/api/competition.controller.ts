import { Competition } from '@hyperremix/song-contest-rater-model';
import { Injectable } from 'injection-js';
import { CompetitionRepository } from '../data-access/competition.repository';

@Injectable()
export class CompetitionController {
  constructor(private competitionRepository: CompetitionRepository) {}

  public async create(competition: Competition): Promise<Competition> {
    return await this.competitionRepository.insert(competition);
  }

  public async list(): Promise<Competition[]> {
    return await this.competitionRepository.list();
  }

  public async get(id: string): Promise<Competition> {
    return await this.competitionRepository.get(id);
  }

  public async update(competition: Competition): Promise<Competition> {
    return await this.competitionRepository.update(competition);
  }

  public async delete(id: string): Promise<Competition> {
    return await this.competitionRepository.delete(id);
  }
}
