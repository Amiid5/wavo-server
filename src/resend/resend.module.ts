import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

export const RESEND = Symbol('RESEND');
export type ResendClient = Resend;

@Global()
@Module({
  providers: [
    {
      provide: RESEND,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const apiKey = config.getOrThrow<string>('RESEND_API_KEY');
        if (!apiKey) {
          throw new Error('invalid Resend api key');
        }
        return new Resend(apiKey);
      },
    },
  ],
  exports: [RESEND],
})
export class ResendModule {}
