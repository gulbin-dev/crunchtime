import { Genres } from "./types";

export default function genreAggregation(
  movieGenreData: Genres | undefined,
  tvGenreData: Genres | undefined,
) {
  if (!movieGenreData || !tvGenreData) return [];
  const mergeData = [...movieGenreData.genres, ...tvGenreData.genres];
  return mergeData.filter(
    (item, index, arr) =>
      index === arr.findIndex((iterateITem) => iterateITem.id === item.id),
  );
}
