import { relations } from "drizzle-orm/relations";
import { artists, songs } from "./schema";

export const songsRelations = relations(songs, ({one}) => ({
	artist: one(artists, {
		fields: [songs.artistId],
		references: [artists.id]
	}),
}));

export const artistsRelations = relations(artists, ({many}) => ({
	songs: many(songs),
}));