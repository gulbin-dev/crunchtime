"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Genres,
  MediaTypes,
  Movie,
  TV,
  FetchResponse,
} from "../../utils/types";
import { FaStar } from "react-icons/fa6";
import { useEffect, useState } from "react";
import genreAggregation from "../../utils/genreAggregation";
import UI_Brick from "../../components/ui/UI_Brick";
import FailedDataDialog from "../../components/ui/Error/FailedDataDialog";
import useSWR from "swr";
import { fetcher } from "@utils/swr/fetcher";

export default function FiveTrend() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: fiveTrend, error: fiveTrendError } = useSWR(
    "/api/heroTrend",
    (url) => fetcher<FetchResponse<MediaTypes>>(url),
    {
      suspense: true,
    },
  );
  const { data: movieGenre, error: movieError } = useSWR(
    "/api/movie",
    (url) => fetcher<Genres>(url),
    {
      suspense: true,
    },
  );
  const { data: tvGenre, error: tvError } = useSWR(
    "/api/tv",
    (url) => fetcher<Genres>(url),
    {
      suspense: true,
    },
  );
  const genres = genreAggregation(movieGenre, tvGenre);

  const normalize = fiveTrend.results
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 5)
    .map((item) => {
      const medtype = item.media_type;
      const title =
        medtype === "movie" ? (item as Movie).title : (item as TV).name;
      const genreIds = item.genre_ids;
      const genreNames = genres
        .filter((item) => genreIds.includes(item.id))
        .map((item) => item.name);

      return { ...item, title, genreNames };
    });

  useEffect(() => {
    if (!normalize) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === normalize.length - 1 ? 0 : prev + 1));
    }, 5500);

    return () => clearInterval(interval);
  }, [normalize, fiveTrendError]);
  return (
    <>
      {fiveTrendError && <FailedDataDialog error={fiveTrendError} />}

      {normalize &&
        normalize.map((item, i) => {
          let setClass = "";
          if (currentIndex === i) {
            setClass = "carousel mid-carousel";
          } else if (currentIndex < i) {
            setClass = "carousel top-carousel";
          } else if (currentIndex > i) {
            setClass = "carousel bottom-carousel";
          }
          return (
            <div
              key={item.id}
              className={`flex absolute w-full h-full inset-0 top-0 left-0  bg-dark-50/55 ${setClass}`}
            >
              <Image
                src={`https://image.tmdb.org/t/p/w1280${item.backdrop_path}`}
                alt=""
                fill={true}
                loading="eager"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover aspect-video w-full h-full"
              />
              <div className="absolute inset-0  bg-black/50 z-10" />

              <div className="z-20 relative  top-32 left-3 w-[90vw] tablet:top-[60vh] tablet:left-18">
                <div className="flex flex-col gap-1">
                  <UI_Brick
                    value={item.media_type?.toUpperCase() || ""}
                    ariaLabel="media type"
                    style="bg-dark-50/40"
                  />
                  <Link
                    href={`/preview/${item.media_type}/${item.id}`}
                    className="text-heading-lg underline underline-offset-8"
                  >
                    {item.title}
                  </Link>
                  <p className="flex items-center gap-0.5">
                    <FaStar aria-label="rating" />
                    <span className="rating">
                      {item.vote_average.toFixed(1)}
                    </span>
                  </p>

                  <ul
                    aria-label="list of genres"
                    className=" flex flex-wrap  grow-0 gap-2"
                  >
                    <UI_Brick value={item.genreNames} style="bg-dark-50/40" />
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}
