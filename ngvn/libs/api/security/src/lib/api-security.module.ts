import { Module } from '@nestjs/common';
import { ApiAuthModule } from '@ngvn/api/auth';
import { ApiUserModule } from '@ngvn/api/user';
import { SecurityController } from './security.controller';
import { SecurityService } from './security.service';

@Module({
  imports: [ApiAuthModule, ApiUserModule],
  controllers: [SecurityController],
  providers: [SecurityService],
})
export class ApiSecurityModule {}
