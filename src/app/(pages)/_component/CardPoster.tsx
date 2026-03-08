"use client";
import Image from "next/image";
import { normalizeData } from "@/src/app/utils/normalizeData";
import Link from "next/link";
import "react-loading-skeleton/dist/skeleton.css";
import useSWR from "swr";
import { FetchResponse, MediaTypes } from "../../utils/types";
import CardPosterImagePlaceholder from "../../components/UI/CardPosterImagePlaceholder";
import LoaderCardPoster from "../../components/UI/LoaderCardPoster";
/**
 * @description - Fetcher function for fetching data from the API.
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<FetchResponse<MediaTypes>>} - A promise that resolves to a FetchResponse object containing the fetched data.
 */
const fetcher = (url: string): Promise<FetchResponse<MediaTypes>> =>
  fetch(url).then((res) => res.json());

/**
 * CardPoster component
 * @param {string} catalog - media type (movie or tv)
 * @param {string} filteredGenre - filtered genre id
 * @returns {JSX.Element} - JSX element to render
 * @description - This component renders a list of movies or TV shows based on their popularity.
 * It also renders a "Show more" button if the list of movies or TV shows is not empty.
 */
export default function CardPoster({
  catalog,
  filteredGenre,
}: {
  catalog: string;
  filteredGenre: string;
}) {
  const { data, isLoading, isValidating } = useSWR(
    `/api/catalog?mediaType=${catalog}&genre=${filteredGenre}`,
    fetcher,
    { suspense: true },
  );
  const normalized = normalizeData(data);
  const showMoreBtn = normalized.length && (
    <Link
      href="/"
      className="rounded-xl bg-cta w-fit h-fit text-nowrap text-light py-1 px-2"
      aria-label={`Show more ${catalog === "movie" ? "movies" : "TV shows"}`}
    >
      Show more
    </Link>
  );

  const cards = normalized.slice(0, 10).map((item, i) => {
    return isValidating || isLoading ? (
      <li key={i}>
        <LoaderCardPoster />
      </li>
    ) : (
      <li key={item.id}>
        <Link
          href={`/preview/${catalog}/${item.id}`}
          aria-label={`View details for ${item.normalized?.normalizeTitle}`}
        >
          <div className="rounded-xl relative min-w-20 h-35 bg-secondary">
            {item.poster_path === null ? (
              <div>
                <CardPosterImagePlaceholder />
              </div>
            ) : (
              <Image
                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                alt=""
                width={160}
                height={187}
                className="rounded-t-xl aspect-6/7"
              />
            )}

            <h3 className="m-1">{item.normalized?.normalizeTitle}</h3>
          </div>
        </Link>
      </li>
    );
  });

  return (
    <>
      {cards}
      {showMoreBtn}
    </>
  );
}
