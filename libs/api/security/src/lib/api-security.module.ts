import { Module } from '@nestjs/common';
import { ApiAuthModule } from '@ngvn/api/auth';
import { ApiUserModule } from '@ngvn/api/user';
import { SecurityResolver } from './security.resolver';
import { SecurityService } from './security.service';

@Module({
  imports: [ApiAuthModule, ApiUserModule],
  providers: [SecurityService, SecurityResolver],
})
export class ApiSecurityModule {
}
