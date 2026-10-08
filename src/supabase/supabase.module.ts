import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export const SUPABASE = Symbol('SUPABASE');
export type Supabase = SupabaseClient;

@Global()
@Module({
  providers: [
    {
      provide: SUPABASE,
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        createClient(
          config.getOrThrow<string>('SUPABASE_URL'),
          config.getOrThrow<string>('SUPABASE_SERVICE_ROLE_KEY'),
        ),
    },
  ],
  exports: [SUPABASE],
})
export class SupabaseModule {}
