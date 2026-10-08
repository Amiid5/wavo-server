export type SongResponse = {
  id: string;
  slug: string;
  name: string;
  mode: string;
  duration: number | null;
  url: string | null;
  artist: {
    id: string;
    slug: string;
    name: string;
    imageUrl: string | null;
  };
};
