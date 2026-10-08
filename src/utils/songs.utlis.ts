export class SongsUtils {
  durationToSeconds(duration: string | null): number | null {
    if (!duration) return null;

    const parts = duration.split(':').map(Number);
    if (parts.some(Number.isNaN)) return null;

    return parts.reduce((total, part) => total * 60 + part, 0);
  }
}

export const songsUtils = new SongsUtils();
