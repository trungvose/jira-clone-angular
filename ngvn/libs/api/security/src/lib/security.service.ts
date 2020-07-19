import { InjectQueue } from '@nestjs/bull';
import { BadRequestException, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '@ngvn/api/auth';
import { LoginParamsDto, RegisterParamsDto, TokenResultDto } from '@ngvn/api/dtos';
import { User, UserService } from '@ngvn/api/user';
import { UserJob, userQueueName } from '@ngvn/background/common';
import { compare } from 'bcrypt';
import { Queue } from 'bull';
import { Response } from 'express';

@Injectable()
export class SecurityService {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    @InjectQueue(userQueueName) private readonly userQueue: Queue,
  ) {
  }

  async register({ email, fullName, password }: RegisterParamsDto): Promise<void> {
    const user = await this.userService.findByEmail(email);
    if (user != null) {
      throw new BadRequestException(email, 'Email already exists');
    }

    const [firstName, lastName] = this.parseFullName(fullName);

    const newUser = this.userService.createModel({ email, firstName, lastName, password });
    await this.userQueue.add(UserJob.AddUser, newUser);
  }

  async login({ password, email }: LoginParamsDto): Promise<[TokenResultDto, string]> {
    const user = await this.userService.findByEmail(email);
    if (user == null) {
      throw new BadRequestException(email, 'Wrong credentials');
    }

    const isMatched = await compare(password, user.password);
    if (!isMatched) {
      throw new NotFoundException(password, 'Wrong credentials');
    }

    return await this.getTokens(user);
  }

  async refresh(refreshToken: string): Promise<[TokenResultDto, string]> {
    if (refreshToken == null) {
      throw new UnauthorizedException(refreshToken, 'No refresh token');
    }

    const { id, tokenId } = await this.authService.verifyRefreshToken(refreshToken).catch((e) => {
      throw new UnauthorizedException(e, 'Error verifying refresh token');
    });

    const user = await this.userService.getUserById(id);
    if (user == null) {
      throw new UnauthorizedException(id, 'User not found');
    }

    if (user.refreshTokenId !== tokenId) {
      throw new UnauthorizedException(tokenId, 'Invalid refresh token');
    }

    return await this.getTokens(user);
  }

  async revoke(refreshToken: string, res: Response): Promise<void> {
    if (refreshToken == null) {
      res.clearCookie('rtok');
      Logger.log('authenticatedGuard runs logout', 'SecurityService');
      return;
    }

    const { id } = await this.authService.verifyRefreshToken(refreshToken).catch((e) => {
      res.clearCookie('rtok');
      throw new UnauthorizedException(e, 'Error verifying refresh token');
    });

    const user = await this.userService.getUserById(id);
    if (user == null) {
      res.clearCookie('rtok');
      throw new UnauthorizedException(id, 'User not found');
    }

    await this.userService.updateRefreshTokenId(id);
  }

  private async getTokens(user: User): Promise<[TokenResultDto, string]> {
    const [accessTokenResult, refreshToken]: [TokenResultDto, string] = await Promise.all([
      this.authService.createAccessToken(user.email),
      this.authService.createRefreshToken(user.id, user.refreshTokenId),
    ]);
    return [accessTokenResult, refreshToken];
  }

  private parseFullName(fullName: string) {
    const parts = fullName.trim().split(' ');
    if (parts.length === 1) {
      return [fullName, ''];
    }

    const lastName = parts.pop();
    return [parts.join(' '), lastName];
  }
}
