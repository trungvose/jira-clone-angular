import { HttpStatus } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { InjectAppConfig } from '@ngvn/api/config';
import { LoginParamsDto, RegisterParamsDto, TokenResultDto } from '@ngvn/api/dtos';
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

  @Mutation((returns) => Boolean, { nullable: true })
  async register(@Args() registerParams: RegisterParamsDto): Promise<void> {
    return await this.securityService.register(registerParams);
  }

  @Mutation((returns) => TokenResultDto)
  async login(@Args() loginParams: LoginParamsDto, @Context('res') res: Response): Promise<TokenResultDto> {
    const [tokenResult, refreshToken] = await this.securityService.login(loginParams);
    res
      .cookie('rtok', refreshToken, {
        httpOnly: true,
        secure: this.appConfig.env !== 'development',
      });
    return tokenResult;
  }
}
