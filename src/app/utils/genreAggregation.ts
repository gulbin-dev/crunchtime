import { Genres } from "./types";

export default function genreAggregation(
  movieGenreData: Genres,
  tvGenreData: Genres,
) {
  const mergeData = [...movieGenreData.genres, ...tvGenreData.genres];
  return mergeData.filter(
    (item, index, arr) =>
      index === arr.findIndex((iterateITem) => iterateITem.id === item.id),
  );
}
