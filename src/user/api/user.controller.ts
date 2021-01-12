import { User } from '@hyperremix/song-contest-rater-model';
import { Injectable } from 'injection-js';
import getUuidByString from 'uuid-by-string';
import { UserRepository } from '../data-access/user.repository';

@Injectable()
export class UserController {
  constructor(private userRepository: UserRepository) {}

  public async create(user: User): Promise<User> {
    user.id = getUuidByString(user.email);
    return await this.userRepository.insert(user);
  }

  public async list(): Promise<User[]> {
    return await this.userRepository.list();
  }

  public async get(id: string): Promise<User> {
    return await this.userRepository.get(id);
  }

  public async update(user: User): Promise<User> {
    return await this.userRepository.update(user);
  }

  public async delete(id: string): Promise<User> {
    return await this.userRepository.delete(id);
  }
}
