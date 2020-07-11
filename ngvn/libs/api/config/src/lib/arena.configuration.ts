import { Inject } from '@nestjs/common';
import { registerAs } from '@nestjs/config';

export const arenaConfiguration = registerAs('arena', () => ({
  disableListen: process.env.ARENA_DISABLE_LISTEN || false,
  host: process.env.ARENA_HOST || 'localhost',
  port: process.env.ARENA_PORT || 8080,
}));

export const InjectArenaConfig = () => Inject(arenaConfiguration.KEY);
