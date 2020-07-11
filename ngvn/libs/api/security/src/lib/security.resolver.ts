import { UseGuards } from '@nestjs/common';
import { Args, Context, Query, Mutation, Resolver } from '@nestjs/graphql';
import { Cookie, CurrentUser, GqlAuthGuard } from '@ngvn/api/common';
import { InjectAppConfig } from '@ngvn/api/config';
import { AuthUserDto, LoginParamsDto, RegisterParamsDto, TokenResultDto } from '@ngvn/api/dtos';
import { AppConfig } from '@ngvn/api/types';
import { Response } from 'express';
import { SecurityService } from './security.service';

@Resolver()
export class SecurityResolver {
  constructor(
    private readonly securityService: SecurityService,
    @InjectAppConfig() private readonly appConfig: AppConfig,
  ) {
  }

  @Query((returns) => TokenResultDto)
  async refreshToken(@Cookie('rtok') refreshToken: string, @Context('res') res: Response): Promise<TokenResultDto> {
    const [tokenResult, newToken] = await this.securityService.refresh(refreshToken);
    res.cookie('rtok', newToken, {
      httpOnly: true,
      secure: this.appConfig.env !== 'development',
    });
    return tokenResult;
  }

  @Mutation((returns) => Boolean, { nullable: true })
  async register(@Args() registerParams: RegisterParamsDto): Promise<void> {
    return await this.securityService.register(registerParams);
  }

  @Mutation((returns) => TokenResultDto)
  async login(@Args() loginParams: LoginParamsDto, @Context('res') res: Response): Promise<TokenResultDto> {
    const [tokenResult, refreshToken] = await this.securityService.login(loginParams);
    res.cookie('rtok', refreshToken, {
      httpOnly: true,
      secure: this.appConfig.env !== 'development',
    });
    return tokenResult;
  }

  @Mutation((returns) => Boolean, { nullable: true })
  async logout(@Cookie('rtok') refreshToken: string, @Context('res') res: Response): Promise<void> {
    await this.securityService.revoke(refreshToken, res);
    res.clearCookie('rtok');
  }
}
