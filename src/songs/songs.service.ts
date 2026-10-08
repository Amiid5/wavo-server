// src/songs/songs.service.ts
import { DATABASE, Database } from '@/db/db.module';
import { artists, songs } from '@/db/schema';
import { SongResponse } from '@/types/songs.types';
import { songsUtils } from '@/utils/songs.utlis';
import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

@Injectable()
export class SongsService {
  constructor(@Inject(DATABASE) private readonly db: Database) {}

  async getSongs(): Promise<SongResponse[]> {
    const rows = await this.db
      .select({ song: songs, artist: artists })
      .from(songs)
      .innerJoin(artists, eq(songs.artistId, artists.id));

    return rows.map(({ song, artist }) => {
      const duration = songsUtils.durationToSeconds(song.duration);

      return {
        id: song.id,
        slug: song.slug,
        name: song.songName,
        mode: song.mode,
        duration,
        url: song.songUrl,
        artist: {
          id: artist.id,
          slug: artist.slug,
          name: artist.name,
          imageUrl: artist.imageUrl,
        },
      };
    });
  }
}
