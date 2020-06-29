import { Injectable } from '@nestjs/common';
import { CacheService } from '@ngvn/api/caching';
import { BaseService } from '@ngvn/api/common';
import { UserInformationDto } from '@ngvn/api/dtos';
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

  async getUserInformation(id: string): Promise<UserInformationDto> {
    const user = await this.getUserById(id);
    return this.mapper.map(user, UserInformationDto, User);
  }

  async updateRefreshTokenId(id: string) {
    await this.userRepository.updateRefreshTokenId(id);
    await this.invalidateUserCache(id);
  }

  private async invalidateUserCache(id: string) {
    await this.cacheService.clear(`user_${id}`);
  }
}
