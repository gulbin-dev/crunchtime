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
import UI_Brick from "../../components/UI/UI_Brick";
import FailedDataDialog from "../../components/UI/Error/FailedDataDialog";
import useSWR from "swr";

const fetcher: <T>(url: string) => Promise<T> = (url) =>
  fetch(url).then((res) => res.json());

export default function FiveTrend() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: fiveTrend, error: fiveTrendError } = useSWR(
    "/api/heroTrend",
    (url) => fetcher<FetchResponse<MediaTypes>>(url),
    {
      suspense: true,
    },
  );
  const { data: movieGenre } = useSWR(
    "/api/movie",
    (url) => fetcher<Genres>(url),
    {
      suspense: true,
    },
  );
  const { data: tvGenre } = useSWR("/api/tv", (url) => fetcher<Genres>(url), {
    suspense: true,
  });
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
    }, 4000);

    return () => clearInterval(interval);
  }, [normalize, fiveTrendError]);

  const activeItem = normalize?.[currentIndex];

  return (
    <>
      {/* 1. Visually Hidden Live Region */}
      {fiveTrendError && <FailedDataDialog error={fiveTrendError} />}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {activeItem
          ? `${activeItem.media_type === "movie" ? "Movie" : "TV Show"} ${activeItem.title} genres are ${activeItem.genreNames.join(", ")}`
          : ""}
      </div>
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
          const isActive = currentIndex === i;
          return (
            <div
              key={item.id}
              className={`flex absolute w-full h-full inset-0 top-0 left-0 ${setClass}`}
              aria-hidden={!isActive}
            >
              <Image
                src={`https://image.tmdb.org/t/p/w1280${item.backdrop_path}`}
                alt=""
                fill={true}
                loading="eager"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0  bg-black/50 z-10" />

              <div className="z-20 relative  top-32 left-3 w-[90vw] tablet:top-[60vh] tablet:left-18">
                <div className="flex flex-col gap-1">
                  <UI_Brick
                    value={item.media_type?.toUpperCase() || ""}
                    style="bg-dark-50/40"
                  />
                  <Link
                    href={`/preview/${item.media_type}/${item.id}`}
                    className="text-heading-lg underline underline-offset-8"
                    tabIndex={isActive ? 0 : -1}
                  >
                    {item.title}
                  </Link>
                  <p className="flex items-center gap-0.5">
                    <FaStar aria-label="rating" />
                    <span className="rating">
                      {item.vote_average.toFixed(1)}
                    </span>
                  </p>
                  <div className="flex flex-wrap  grow-0 gap-2">
                    <UI_Brick value={item.genreNames} style="bg-dark-50/40" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}
