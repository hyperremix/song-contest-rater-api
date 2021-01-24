import { Rating } from '@hyperremix/song-contest-rater-model';
import { Injectable } from 'injection-js';
import getUuidByString from 'uuid-by-string';
import { RatingRepository } from '../data-access/rating.repository';

@Injectable()
export class RatingController {
  constructor(private ratingRepository: RatingRepository) {}

  public async create(rating: Rating): Promise<Rating> {
    rating.id = getUuidByString(`${rating.userId}_${rating.competitionId}_${rating.actId}`);
    return await this.ratingRepository.insert(rating);
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
