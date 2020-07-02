import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { CurrentUser, GqlAuthGuard } from '@ngvn/api/common';
import { AuthUserDto, UserInformationDto } from '@ngvn/api/dtos';
import { PermissionGuard } from '@ngvn/api/permission';
import { PermissionNames, Privilege } from '@ngvn/shared/permission';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => UserInformationDto)
  @UseGuards(GqlAuthGuard, PermissionGuard(PermissionNames.UserSelf, Privilege.Read))
  async me(@CurrentUser() currentUser: AuthUserDto): Promise<UserInformationDto> {
    return await this.userService.getUserInformation(currentUser.id);
  }
}
