"use client";
import { redirect } from "next/navigation";
import { TbLetterX } from "react-icons/tb";
import { Suspense, useEffect, useRef, useState, useTransition } from "react";
import QueryCard from "./_component/QueryCard";
import useSWR from "swr";
import { FetchResponse, MediaTypes } from "../../utils/types";
import { normalizeData } from "../../utils/normalizeData";

import { movieGenreList, tvGenreList } from "@server/cache-fetch";
import LoaderCardPoster from "../../components/UI/LoaderCardPoster";
const fetcher = (url: string): Promise<FetchResponse<MediaTypes>> =>
  fetch(url).then((res) => res.json());

export default function SearchPage() {
  const inputref = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [isMovie, setIsMovie] = useState(true);
  const [isPending, startTransition] = useTransition();
  const { data, isLoading, isValidating } = useSWR(
    `/search/api/search?query=${query}&media=${isMovie ? "movie" : "tv"}`,
    (url: string) => fetcher(url),
  );
  const normalized = data && normalizeData(data);
  useEffect(() => {
    inputref.current?.focus();
  });
  console.log(normalized);
  function handleQuery() {
    if (inputref.current) {
      const e = inputref.current.value;
      console.log(e);
      if (e.length > 0) {
        startTransition(() => {
          setTimeout(async () => {
            await fetch(
              `/search/api/search?query=${e}&media=${isMovie ? "movie" : "tv"}`,
            );
          }, 500);
        });
      }
    }
  }
  return (
    <main className="bg-dark-50 w-full min-h-screen h-full flex flex-col px-3 text-light">
      <button
        className="self-end my-3 bg-cta p-1 rounded-lg"
        onClick={() => redirect("/")}
        aria-label="go back to homepage"
      >
        <TbLetterX className="font-bold" aria-hidden />
      </button>
      <h2>Finding Movies/TV shows</h2>
      <input
        ref={inputref}
        className="p-0.5 mt-1 rounded-sm text-dark bg-light"
        onChange={(e) => {
          setQuery(e.target.value);
          handleQuery();
        }}
      />

      <div
        className="flex mt-2 justify-center"
        role="tablist"
        aria-label="Select movie or tv to search"
      >
        <button
          className={`w-10 h-fit py-1 px-2 rounded-l-md font-bold text-light ${isMovie ? "bg-cta" : "bg-cta-secondary"}`}
          onClick={() => {
            setIsMovie(true);
            handleQuery();
          }}
          role="tab"
          aria-selected={isMovie}
        >
          Movie
        </button>
        <button
          className={`w-10 h-fit py-1 px-2 rounded-r-md font-bold text-light ${isMovie ? "bg-cta-secondary" : "bg-cta"}`}
          onClick={() => {
            setIsMovie(false);
            handleQuery();
          }}
          role="tab"
          aria-selected={isMovie === false}
        >
          TV
        </button>
      </div>

      <div className="w-full my-5">
        {normalized === undefined && <p>Nothing to show</p>}
        <ul className="mt-5 flex flex-wrap gap-2">
          {normalized !== undefined &&
            normalized.map((item) => (
              <li key={item.id}>
                <Suspense fallback={<LoaderCardPoster />}>
                  <QueryCard item={item} isMovie={isMovie} />
                </Suspense>
              </li>
            ))}
        </ul>
      </div>
    </main>
  );
}
