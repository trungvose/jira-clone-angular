import { Module } from '@nestjs/common';
import { BackgroundUserJobModule } from '@ngvn/background/user-job';

export const backgroundModules = [BackgroundUserJobModule];

@Module({ imports: [...backgroundModules] })
export class BackgroundModule {}
