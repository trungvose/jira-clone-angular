import { Controller, Post } from '@nestjs/common';
import { CurrentUser } from './user';

@Controller('auth')
export class AuthController {
  @Post()
  login() {
    return CurrentUser;
  }
}
