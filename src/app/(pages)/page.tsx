import Link from "next/link";
import ToggleModal from "@/src/app/(pages)/_component/ToggleModal";
import FiveTrend from "./_component/FiveTrend";
import CatalogSection from "./_component/CatalogSection";
import { movieGenreList, trendingList, tvGenreList } from "@server/cache-fetch";
import { Suspense } from "react";
import CatalogSectionWrapper from "../components/Wrapper/CatalogSectionWrapper";
import FiveTrendLoader from "../components/UI/FiveTrendLoader";
/**
 * Home page component
 * @description - This component renders the home page, containing a hero section, a trending section, a catalog section for different genres, and a call-to-action section to sign up.
 * @returns {JSX.Element} - JSX element to render
 */
export default function Home() {
  const fiveTrendData = trendingList();
  const movieGenreData = movieGenreList();
  const tvGenreData = tvGenreList();
  return (
    <main className="max-w-180 place-self-center ">
      <section className=" relative text-light w-full h-screen overflow-hidden">
        <div className="absolute z-30 flex flex-col">
          <h1
            className="text-center text-heading-lg  font-boldtext-center mt-2
          tablet:mt-10 tablet:ml-10  tablet:text-heading-xl
          "
          >
            Discover worth to watch movies & TV shows
          </h1>
          <ToggleModal />
          <h2 className="relative top-7 ml-3 text-heading-lg tablet:top-[13vh] tablet:left-10">
            Top 5 Most Popular
          </h2>
        </div>

        <div className="w-full h-screen relative overflow-hidden">
          <Suspense fallback={<FiveTrendLoader />}>
            <FiveTrend
              fiveTrendData={fiveTrendData}
              movieGenreData={movieGenreData}
              tvGenreData={tvGenreData}
            />
          </Suspense>
        </div>
      </section>

      <CatalogSectionWrapper>
        <CatalogSection
          sectionTitle="Trending"
          genre={[""]}
          movieGenreData={movieGenreData}
          tvGenreData={tvGenreData}
        />
      </CatalogSectionWrapper>

      <CatalogSectionWrapper>
        <CatalogSection
          sectionTitle="Action"
          genre={["Action"]}
          movieGenreData={movieGenreData}
          tvGenreData={tvGenreData}
        />
      </CatalogSectionWrapper>

      <CatalogSectionWrapper>
        <CatalogSection
          sectionTitle="Animation"
          genre={["Animation"]}
          movieGenreData={movieGenreData}
          tvGenreData={tvGenreData}
        />
      </CatalogSectionWrapper>

      <CatalogSectionWrapper>
        <CatalogSection
          sectionTitle="Drama"
          genre={["Drama"]}
          movieGenreData={movieGenreData}
          tvGenreData={tvGenreData}
        />
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
            Watch on smart TVs, gaming consoles, mobile devices and computers
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
      </section>
    </main>
  );
}
