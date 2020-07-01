import { Body, Controller, Get, HttpStatus, Post, Put, Res } from '@nestjs/common';
import { Cookie, CurrentUser } from '@ngvn/api/common';
import { InjectAppConfig } from '@ngvn/api/config';
import { AuthUserDto, LoginParamsDto, RegisterParamsDto } from '@ngvn/api/dtos';
import { AppConfig } from '@ngvn/api/types';
import { Response } from 'express';
import { SecurityService } from './security.service';

@Controller('security')
export class SecurityController {
  constructor(
    private readonly securityService: SecurityService,
    @InjectAppConfig() private readonly appConfig: AppConfig,
  ) {}

  @Post('register')
  async register(@Body() registerParams: RegisterParamsDto): Promise<void> {
    return await this.securityService.register(registerParams);
  }

  @Post('login')
  async login(@Body() loginParams: LoginParamsDto, @Res() res: Response): Promise<void> {
    const [tokenResult, refreshToken] = await this.securityService.login(loginParams);
    res
      .cookie('rtok', refreshToken, {
        httpOnly: true,
        secure: this.appConfig.env !== 'development',
      })
      .json(tokenResult);
  }

  @Put('logout')
  async logout(@CurrentUser() user: AuthUserDto, @Res() res: Response): Promise<void> {
    await this.securityService.revoke(user.id);
    res.clearCookie('rtok').status(HttpStatus.OK).end();
  }

  @Get('refresh-token')
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
