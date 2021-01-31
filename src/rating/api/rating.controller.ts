import { Rating } from '@hyperremix/song-contest-rater-model';
import { Injectable } from 'injection-js';
import getUuidByString from 'uuid-by-string';
import { CompetitionRepository } from '../../competition/data-access/competition.repository';
import { RatingRepository } from '../data-access/rating.repository';

@Injectable()
export class RatingController {
  constructor(
    private ratingRepository: RatingRepository,
    private competitionRepository: CompetitionRepository
  ) {}

  public async create(rating: Rating): Promise<Rating> {
    rating.id = getUuidByString(`${rating.userId}_${rating.competitionId}_${rating.actId}`);

    const result = await this.ratingRepository.insert(rating);
    const competition = await this.competitionRepository.get(rating.competitionId);
    competition.ratingIds = competition.ratingIds
      ? [...competition.ratingIds, result.id]
      : [result.id];
    await this.competitionRepository.update(competition);
    return result;
  }

  public async list(): Promise<Rating[]> {
    return await this.ratingRepository.list();
  }

  public async get(id: string): Promise<Rating> {
    return await this.ratingRepository.get(id);
  }

  public async update(rating: Rating): Promise<Rating> {
    return await this.ratingRepository.update(rating);
  }

  public async delete(id: string): Promise<Rating> {
    return await this.ratingRepository.delete(id);
  }

  public async query(ids: string[]): Promise<Rating[]> {
    return await this.ratingRepository.query(ids);
  }
}
