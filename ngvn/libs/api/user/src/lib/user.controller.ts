import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiErrors, ApiOperationId, CurrentUser } from '@ngvn/api/common';
import { AuthUserDto, UserInformationDto } from '@ngvn/api/dtos';
import { PermissionGuard } from '@ngvn/api/permission';
import { PermissionNames, Privilege } from '@ngvn/shared/permission';
import { UserService } from './user.service';
import { User } from './user.model';

@Controller('users')
@ApiTags(User.modelName)
@ApiErrors()
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard(), PermissionGuard(PermissionNames.UserManage, Privilege.Read))
  @ApiOkResponse({ type: UserInformationDto })
  @ApiOperationId()
  async me(@CurrentUser() user: AuthUserDto): Promise<UserInformationDto> {
    return await this.userService.getUserInformation(user.id);
  }
}
