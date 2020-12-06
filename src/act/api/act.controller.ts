import { Injectable } from 'injection-js';
import { ActRepository } from '../data-access/act.repository';
import { Act } from '../model/act';

@Injectable()
export class ActController {
  constructor(private actRepository: ActRepository) {}

  public async create(act: Act): Promise<void> {
    await this.actRepository.insert(act);
  }

  public async list(): Promise<Act[]> {
    return await this.actRepository.list();
  }

  public async get(id: string): Promise<Act> {
    return await this.actRepository.get(id);
  }
}
