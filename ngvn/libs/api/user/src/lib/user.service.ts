import { Injectable } from '@nestjs/common';
import { CacheService } from '@ngvn/api/caching';
import { BaseService } from '@ngvn/api/common';
import { InjectMapper, AutoMapper } from 'nestjsx-automapper';
import { User } from './user.model';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cacheService: CacheService,
    @InjectMapper() private readonly mapper: AutoMapper,
  ) {
    super(userRepository);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }

  async getUserById(id: string): Promise<User> {
    return await this.cacheService.get(`user_${id}`, () => this.userRepository.findById(id).exec());
  }

  private async invalidateUserCache(id: string) {
    await this.cacheService.clear(`user_${id}`);
  }
}
