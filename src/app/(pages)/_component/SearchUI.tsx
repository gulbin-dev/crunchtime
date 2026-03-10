"use client";
import useSWR from "swr";
import { useState, Suspense, useEffect, useRef } from "react";
import { FetchResponse, MediaTypes } from "../../utils/types";
import QueryCard from "./QueryCard";
import { normalizeData } from "@utils/normalizeData";
import { TbLetterX } from "react-icons/tb";
import LoaderCardPoster from "../../components/UI/LoaderCardPoster";
import PageLoader from "../../components/UI/PageLoader";

const fetcher = (url: string): Promise<FetchResponse<MediaTypes>> =>
  fetch(url).then((res) => res.json());

export default function SearchUI({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [query, setQuery] = useState("");
  const [isMovie, setIsMovie] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const { data, isLoading } = useSWR(
    (query.length > 0 && isMovie) || (query.length > 0 && !isMovie)
      ? `/api/search?query=${query}&media=${isMovie ? "movie" : "tv"}`
      : null,
    fetcher,
  );
  const normalized = data ? normalizeData(data) : [];
  console.log(data);
  useEffect(() => {
    inputRef.current?.focus();
  }, [isMovie]);

  return (
    <div className="bg-dark-50 w-full h-full min-h-screen px-3 text-light place-self-center z-30">
      <button
        className="self-end my-3 bg-cta p-1 rounded-lg"
        onClick={() => setIsOpen(false)}
        aria-label="go back to homepage"
      >
        <TbLetterX className="font-bold" aria-hidden />
      </button>

      <h2 className="tablet:text-heading-lg">Finding Movies/TV shows</h2>

      <input
        ref={inputRef}
        value={query}
        className="p-0.5 mt-1 rounded-sm text-dark bg-light tablet:text-3xl tablet:mt-3 tablet:w-100 tablet:ml-6 tablet:p-1"
        placeholder="Type to search..."
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="flex mt-2 justify-center" role="tablist">
        <button
          className={`w-10 h-fit py-1 px-2 rounded-l-md font-bold text-light ${isMovie ? "bg-cta" : "bg-cta-secondary"}`}
          onClick={() => setIsMovie(true)}
          role="tab"
        >
          Movie
        </button>
        <button
          className={`w-10 h-fit py-1 px-2 rounded-r-md font-bold text-light ${!isMovie ? "bg-cta" : "bg-cta-secondary"}`}
          onClick={() => setIsMovie(false)}
          role="tab"
        >
          TV
        </button>
      </div>

      <div className="w-full my-5">
        {isLoading && query.length > 0 && (
          <div className="pt-10 justify-self-center">
            <PageLoader />
          </div>
        )}

        {/* Render results as soon as they exist */}
        <ul className="my-5 py-5 grid gap-2 grid-cols-[repeat(auto-fill,minmax(272px,1fr))] place-items-center w-full desktop:gap-y-5">
          {normalized.map((item) => (
            <li key={item.id}>
              <Suspense fallback={<LoaderCardPoster />}>
                <QueryCard item={item} isMovie={isMovie} />
              </Suspense>
            </li>
          ))}
        </ul>

        {/* Only show empty state if not loading and query exists */}
        {!isLoading && query.length > 0 && normalized.length === 0 && (
          <p className="text-center mt-10">
            No results found for &quot;{query}&quot;
          </p>
        )}
      </div>
    </div>
  );
}
