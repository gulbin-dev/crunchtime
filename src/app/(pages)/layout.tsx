import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SkeletonTheme } from "react-loading-skeleton";
import { SWRConfig } from "swr";
import { discoverMedia } from "../server/discoverMedia";
import { Suspense } from "react";
import PageLoader from "../components/ui/PageLoader";

import { movieGenreList, trendingList, tvGenreList } from "@server/cache-fetch";
import "react-loading-skeleton/dist/skeleton.css";
import "@styles/globals.css";
export const metadata: Metadata = {
  title: "CrunchTime",
};

const poppins = Poppins({
  weight: ["400", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
  fallback: ["Arial"],
});
const roboto = Roboto({
  weight: "400",
  variable: "--font-roboto",
  subsets: ["latin"],
  fallback: ["sans serif"],
});

/**
 * The root layout component for the app.
 * It fetches trending, action, animation, and drama movies from the server.
 * It renders the header, footer, and children components wrapped in a SWRConfig component.
 * The SWRConfig component is used to configure the SWR library for server-side rendering.
 * The trending, action, animation, and drama movies are used as fallback data for the SWRConfig component.
 * The children components are wrapped in a SkeletonTheme component to display a loading skeleton while the data is being fetched.
 * The SkeletonTheme component is used to configure the react-loading-skeleton library for server-side rendering.
 * The baseColor and highlightColor props are used to customize the appearance of the loading skeleton.
 * The baseColor prop is used to set the background color of the loading skeleton.
 * The highlightColor prop is used to set the color of the loading skeleton's highlights.
 * @example
 * <RootLayout>
 *   <div>
 *     <h1>Hello World!</h1>
 *   </div>
 * </RootLayout>
 * @returns {JSX.Element} - The root layout component.
 */

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [trending, action, animation, drama, heroTrend, movieGenre, tvGenre] =
    await Promise.all([
      discoverMedia("movie", [""]),
      discoverMedia("movie", ["28", "10759"]),
      discoverMedia("movie", ["16"]),
      discoverMedia("movie", ["18"]),
      trendingList(),
      movieGenreList(),
      tvGenreList(),
    ]);
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${roboto.variable}`}
      data-overlayscrollbars-initialize
    >
      <Suspense
        fallback={
          <body data-overlayscrollbars-initialize>
            <Header />
            <div className="flex items-center justify-center w-full h-screen">
              <PageLoader />
            </div>
            <Footer />
          </body>
        }
      >
        <SWRConfig
          value={{
            fallback: {
              "/api/catalog?mediaType=movie&genre=": trending,
              "/api/catalog?mediaType=movie&genre=28|10759": action,
              "/api/catalog?mediaType=movie&genre=16": animation,
              "/api/catalog?mediaType=movie&genre=18": drama,
              "/api/movie": movieGenre,
              "/api/tv": tvGenre,
              "/api/heroTrend": heroTrend,
            },
          }}
        >
          <body className="bg-light" data-overlayscrollbars-initialize>
            <Header />
            <SkeletonTheme baseColor="#bcbcbc" highlightColor="#393939">
              {children}
            </SkeletonTheme>
            <Footer />
          </body>
        </SWRConfig>
      </Suspense>
    </html>
  );
}
