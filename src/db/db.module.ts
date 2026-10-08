import { Global, Inject, Module, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

export const DATABASE = Symbol('DATABASE');
export const PG_POOL = Symbol('PG_POOL');

export type Database = NodePgDatabase<typeof schema>;
@Global()
@Module({
  providers: [
    {
      provide: PG_POOL,
      inject: [ConfigService],
      useFactory: (config: ConfigService): Pool => {
        const dbUrl = config.getOrThrow<string>('DATABASE_URL');
        const pool = new Pool({
          connectionString: dbUrl,
        });
        return pool;
      },
    },
    {
      provide: DATABASE,
      inject: [PG_POOL],
      useFactory: (pool: Pool): Database => {
        const drizzleConfig = drizzle(pool, { schema: schema });
        return drizzleConfig;
      },
    },
  ],
  exports: [DATABASE],
})
export class DbModule implements OnApplicationShutdown {
  constructor(@Inject(PG_POOL) private readonly db: Pool) {}
  async onApplicationShutdown() {
    await this.db.end();
  }
}
