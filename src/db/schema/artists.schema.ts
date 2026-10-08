import { pgTable, unique, uuid, text } from 'drizzle-orm/pg-core';

export const artists = pgTable(
  'artists',
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    slug: text().notNull(),
    name: text().notNull(),
    imageUrl: text('image_url'),
  },
  (table) => [unique('artists_slug_key').on(table.slug)],
);
