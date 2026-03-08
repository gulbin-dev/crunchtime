import CardPosterImagePlaceholder from "@/src/app/components/UI/CardPosterImagePlaceholder";
import UI_Brick from "@/src/app/components/UI/UI_Brick";
import genreAggregation from "@/src/app/utils/genreAggregation";
import { Movie, TV, Genres } from "@/src/app/utils/types";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url: string): Promise<Genres> =>
  fetch(url).then((res) => res.json());
export default function QueryCard({
  item,
  isMovie,
}: {
  item: Movie | TV;
  isMovie: boolean;
}) {
  const mediaType = isMovie ? "movie" : "tv";
  const { data: movie } = useSWR(`/search/api/movie`, (url) => fetcher(url), {
    suspense: true,
  });
  const { data: tv } = useSWR(`/search/api/tv`, (url) => fetcher(url), {
    suspense: true,
  });
  const genres = genreAggregation(movie, tv);
  const itemGenres = genres
    .filter((genre) => item.genre_ids.includes(genre.id))
    .map((item) => item.name);
  return (
    <Link href={`/preview/${mediaType}/${item.id}`}>
      <div className="flex w-full gap-2">
        {item.poster_path === null ? (
          <div className="w-15 h-17.5">
            <CardPosterImagePlaceholder />
          </div>
        ) : (
          <Image
            src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
            alt=""
            width={120}
            height={140}
            className="rounded-t-xl aspect-6/7 object-cover"
          />
        )}

        <div>
          <h2>
            {item.normalized && item.normalized?.normalizeTitle.length > 25
              ? item.normalized?.normalizeTitle.slice(0, 25).concat("...")
              : item.normalized?.normalizeTitle}
          </h2>
          {itemGenres.length === 1 ? (
            <UI_Brick value={itemGenres} style="text-heading-sm mt-1" />
          ) : itemGenres.length > 1 ? (
            <div className="flex gap-1">
              <UI_Brick value={itemGenres[0]} style="text-heading-sm mt-1" />
              <div className="w-fit border py-0.2 px-1 rounded-xl text-heading-sm mt-1">
                <p>+{itemGenres.length - 1}</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
