import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { SupabaseModule } from './supabase/supabase.module';
import { ResendModule } from './resend/resend.module';

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule,
    SupabaseModule,
    ResendModule,
    AuthModule,
  ],
})
export class AppModule {}
