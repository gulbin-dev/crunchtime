"use client";
import Link from "next/link";
import FiveTrend from "./_component/FiveTrend";
import CatalogSection from "./_component/CatalogSection";
import { Suspense } from "react";
import CatalogSectionWrapper from "../components/Wrapper/CatalogSectionWrapper";
import FiveTrendLoader from "../components/UI/FiveTrendLoader";
import { useState } from "react";
import SearchUI from "./_component/SearchUI";
import PageLoader from "../components/UI/PageLoader";
/**
 * Home page component
 * @description - This component renders the home page, containing a hero section, a trending section, a catalog section for different genres, and a call-to-action section to sign up.
 * @returns {JSX.Element} - JSX element to render
 */
export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <main className="max-w-180 place-self-center relative w-full">
      {isOpen ? (
        <SearchUI setIsOpen={setIsOpen} />
      ) : (
        <>
          <section className="relative text-light w-full h-screen overflow-hidden">
            <div className="absolute z-30 flex flex-col max-w-180 w-full">
              <h1
                className="text-center text-heading-lg  font-boldtext-center mt-2
          tablet:mt-10 tablet:ml-10  tablet:text-heading-xl tablet:text-start
          "
              >
                Discover worth to watch movies & TV shows
              </h1>
              <button
                className="bg-white text-dark py-0.5 mx-5 mt-3 rounded-lg tablet:w-60 tablet:mt-6 tablet:ml-15 tablet:text-heading-md"
                onClick={() => setIsOpen(true)}
              >
                Find you want to watch...
              </button>
              <h2 className="relative z-20 top-7 ml-3 text-heading-lg tablet:top-[10vh] tablet:left-10">
                Top 5 Most Popular
              </h2>
            </div>

            <div className="w-full h-screen relative overflow-hidden">
              <Suspense fallback={<FiveTrendLoader />}>
                <FiveTrend />
              </Suspense>
            </div>
          </section>
          <CatalogSectionWrapper>
            <Suspense fallback={<PageLoader />}>
              <CatalogSection sectionTitle="Trending" genre={[""]} />
            </Suspense>
          </CatalogSectionWrapper>
          <CatalogSectionWrapper>
            <Suspense fallback={<PageLoader />}>
              <CatalogSection sectionTitle="Action" genre={["Action"]} />
            </Suspense>
          </CatalogSectionWrapper>
          <CatalogSectionWrapper>
            <Suspense fallback={<PageLoader />}>
              <CatalogSection sectionTitle="Animation" genre={["Animation"]} />
            </Suspense>
          </CatalogSectionWrapper>
          <CatalogSectionWrapper>
            <Suspense fallback={<PageLoader />}>
              <CatalogSection sectionTitle="Drama" genre={["Drama"]} />
            </Suspense>
          </CatalogSectionWrapper>
          <section className="flex flex-col">
            <Link
              href="/"
              className="rounded-xl p-3 text-nowrap text-light bg-cta font-bold w-fit h-fit place-self-center mt-4"
            >
              DISCOVER MORE
            </Link>
            <div className="bg-gray-shade mt-5 px-3 py-4">
              <h3 className="text-heading-lg">Watch Anytime, Anywhere</h3>
              <p className="mt-1">
                Watch on smart TVs, gaming consoles, mobile devices and
                computers
              </p>

              <h3 className="text-heading-lg mt-3">Watch it later</h3>
              <p className="mt-1">
                Download your favorite movies and TV shows offline
              </p>
            </div>

            <div className="flex flex-col rounded-lg text-light place-self-center my-5 p-2 bg-secondary">
              <h3 className=" text-heading-lg">JOIN US NOW</h3>
              <Link
                href="/"
                className="bg-cta py-1 mt-1 px-3 w-fit place-self-center rounded-md"
              >
                SIGN UP
              </Link>
            </div>
          </section>{" "}
        </>
      )}
    </main>
  );
}
