"use client";
import Link from "next/link";
import Image from "next/image";
import {
  FetchResponse,
  Genres,
  MediaTypes,
  Movie,
  TV,
} from "../../utils/types";
import { FaStar } from "react-icons/fa6";
import { useEffect, useState } from "react";
import genreAggregation from "../../utils/genreAggregation";
import UI_Brick from "../../components/UI/UI_Brick";
import { use } from "react";
interface PropType {
  fiveTrendData: Promise<FetchResponse<MediaTypes>>;
  movieGenreData: Promise<Genres>;
  tvGenreData: Promise<Genres>;
}

/**
 * FiveTrend component
 * @param {PropType} props - props including fiveTrendData, movieGenreData, and tvGenreData
 * @returns {JSX.Element} - JSX element to render
 * @description - This component renders the five most trending movies or TV shows based on their popularity.
 * It also renders the genre names of the trending movies or TV shows.
 */
export default function FiveTrend({
  fiveTrendData,
  movieGenreData,
  tvGenreData,
}: PropType) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const fiveTrend = use(fiveTrendData);
  const movieGenre = use(movieGenreData);
  const tvGenre = use(tvGenreData);
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

  const activeItem = normalize[currentIndex];

  useEffect(() => {
    if (normalize.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === normalize.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [normalize.length]);
  return (
    <>
      {/* 1. Visually Hidden Live Region */}
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
