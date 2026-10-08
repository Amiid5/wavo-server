import { pgTable, unique, uuid, text, foreignKey } from 'drizzle-orm/pg-core';
import { artists } from '../schema';

export const songs = pgTable(
  'songs',
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    slug: text().notNull(),
    artistId: uuid('artist_id').notNull(),
    artistSlug: text('artist_slug').notNull(),
    songName: text('song_name').notNull(),
    mode: text().notNull(),
    duration: text(),
    songUrl: text('song_url'),
  },
  (table) => [
    foreignKey({
      columns: [table.artistId],
      foreignColumns: [artists.id],
      name: 'songs_artist_id_fkey',
    }).onDelete('cascade'),
    unique('songs_artist_id_slug_key').on(table.slug, table.artistId),
  ],
);
