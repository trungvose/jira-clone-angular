import { Body, Controller, Get, HttpStatus, Post, Put, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCookieAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiErrors, ApiOperationId, Cookie, CurrentUser } from '@ngvn/api/common';
import { InjectAppConfig } from '@ngvn/api/config';
import { AuthUserDto, LoginParamsDto, RegisterParamsDto, TokenResultDto } from '@ngvn/api/dtos';
import { AppConfig } from '@ngvn/api/types';
import { Response } from 'express';
import { SecurityService } from './security.service';

@Controller('security')
@ApiTags('Security')
@ApiErrors()
export class SecurityController {
  constructor(
    private readonly securityService: SecurityService,
    @InjectAppConfig() private readonly appConfig: AppConfig,
  ) {}

  @Post('register')
  @ApiCreatedResponse()
  @ApiOperationId()
  async register(@Body() registerParams: RegisterParamsDto): Promise<void> {
    return await this.securityService.register(registerParams);
  }

  @Post('login')
  @ApiCreatedResponse({
    type: TokenResultDto,
    headers: {
      'Set-Cookie': {
        description: 'Refresh Token',
        schema: { type: 'string' },
      },
    },
  })
  @ApiOperationId()
  async login(@Body() loginParams: LoginParamsDto, @Res() res: Response): Promise<void> {
    const [tokenResult, refreshToken] = await this.securityService.login(loginParams);
    res
      .cookie('rtok', refreshToken, {
        httpOnly: true,
        secure: this.appConfig.env !== 'development',
      })
      .status(HttpStatus.CREATED)
      .json(tokenResult);
  }

  @Put('logout')
  @UseGuards(AuthGuard())
  @ApiOkResponse()
  @ApiOperationId()
  @ApiBearerAuth()
  async logout(@CurrentUser() user: AuthUserDto, @Res() res: Response): Promise<void> {
    await this.securityService.revoke(user.id);
    res.clearCookie('rtok').status(HttpStatus.OK).end();
  }

  @Get('refresh-token')
  @ApiOkResponse({
    type: TokenResultDto,
    headers: {
      'Set-Cookie': {
        description: 'Refresh Token',
        schema: { type: 'string' },
      },
    },
  })
  @ApiOperationId()
  @ApiCookieAuth()
  async refreshToken(@Cookie('rtok') refreshToken: string, @Res() res: Response): Promise<void> {
    const [tokenResult, newToken] = await this.securityService.refresh(refreshToken);
    res
      .cookie('rtok', newToken, {
        httpOnly: true,
        secure: this.appConfig.env !== 'development',
      })
      .status(HttpStatus.OK)
      .json(tokenResult);
  }
}
