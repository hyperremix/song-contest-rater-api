import { Act } from '@hyperremix/song-contest-rater-model';
import { Injectable } from 'injection-js';
import { ActRepository } from '../data-access/act.repository';

@Injectable()
export class ActController {
  constructor(private actRepository: ActRepository) {}

  public async create(act: Act): Promise<Act> {
    return await this.actRepository.insert(act);
  }

  public async list(): Promise<Act[]> {
    return await this.actRepository.list();
  }

  public async get(id: string): Promise<Act> {
    return await this.actRepository.get(id);
  }

  public async update(act: Act): Promise<Act> {
    return await this.actRepository.update(act);
  }

  public async delete(id: string): Promise<Act> {
    return await this.actRepository.delete(id);
  }

  public async query(ids: string[]): Promise<Act[]> {
    return await this.actRepository.query(ids);
  }
}
