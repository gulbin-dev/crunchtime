"use client";
import { useState } from "react";
import CardPoster from "./CardPoster";
import { Suspense } from "react";
import InitialLoaderCardPoster from "../../components/UI/InitialLoaderCardPoster";
import { Genres } from "../../utils/types";
import genreAggregation from "../../utils/genreAggregation";
import { checkGenreName } from "../../utils/checkGenreName";

import { use } from "react";
interface PropType {
  sectionTitle: string;
  genre: string[];
  movieGenreData: Promise<Genres>;
  tvGenreData: Promise<Genres>;
}
/**
 * CatalogSection component
 * @description - This component renders a section of movies or TV shows based on their popularity.
 * It also renders a "Show more" button if the list of movies or TV shows is not empty.
 * @param {string} sectionTitle - title of the section
 * @param {string[]} genre - list of genre names
 * @param {Promise<Genres>} movieGenreData - promise of movie genre data
 * @param {Promise<Genres>} tvGenreData - promise of TV genre data
 * @returns {JSX.Element} - JSX element to render
 */
export default function CatalogSection({
  sectionTitle,
  genre,
  movieGenreData,
  tvGenreData,
}: PropType) {
  const [catalog, setCatalog] = useState("movie");
  const movieGenre = use(movieGenreData);
  const tvGenre = use(tvGenreData);
  const fullGenreList = genreAggregation(movieGenre, tvGenre);
  const genreID = fullGenreList
    .filter((item) => checkGenreName(item, genre))
    .map((item) => item.id);
  const filteredGenre = genreID.join("|");
  function handleSwitch(type: string) {
    setCatalog(type);
  }

  return (
    <>
      <div className="flex gap-2 mt-2 ml-3 m-w-180">
        <h2 className="text-heading-lg" id="header-section-title">
          {sectionTitle}
        </h2>
        <div className="flex" role="tablist" aria-label="Select catalog type">
          <button
            className={`w-10 h-fit py-1 px-2 rounded-l-md font-bold text-light ${catalog === "movie" ? "bg-cta" : "bg-cta-secondary"}`}
            onClick={() => handleSwitch("movie")}
            role="tab"
            aria-selected={catalog === "movie"}
          >
            Movie
          </button>
          <button
            className={`w-10 h-fit py-1 px-2 rounded-r-md font-bold text-light ${catalog === "tv" ? "bg-cta" : "bg-cta-secondary"}`}
            onClick={() => handleSwitch("tv")}
            role="tab"
            aria-selected={catalog === "tv"}
          >
            TV
          </button>
        </div>
      </div>
      <div
        className="w-[90vw] h-42 p-3 relative overflow-y-hidden overflow-x-auto overlayscrollbars-react scroller"
        role="tab-panel"
      >
        <ul className="flex gap-3 items-center " aria-live="polite">
          <Suspense fallback={<InitialLoaderCardPoster />}>
            <CardPoster catalog={catalog} filteredGenre={filteredGenre} />
          </Suspense>
        </ul>
      </div>
    </>
  );
}
