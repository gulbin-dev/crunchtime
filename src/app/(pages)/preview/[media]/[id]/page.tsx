"use client";
import { Preview } from "@utils/types";
import { useParams } from "next/navigation";
import { normalizePreviewData } from "@utils/normalizeData";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import useSWR from "swr";
import { Suspense, useState } from "react";
import MediaBanner from "@components/MediaBanner";
import LineBreak from "@components/ui/LineBreak";
import LoaderCardPoster from "@components/ui/LoaderCardPoster";
import FailedDataDialog from "@components/ui/error/FailedDataDialog";
import PageLoader from "@components/ui/PageLoader";
import Skeleton from "react-loading-skeleton";
import { fetcher } from "@utils/swr/fetcher";
import { useTheme } from "@utils/zustand/theme";
import SearchUI from "@components/SearchUI";
import ReviewComponent from "@components/ReviewComponent";
export default function PreviewPage() {
  const params = useParams();
  const { data, error, isLoading } = useSWR(
    `/preview/${params.media}/${params.id}/api/preview?media=${params.media}&id=${params.id}`,
    (url) => fetcher<Preview>(url),
  );
  const theme = useTheme((state) => state.theme);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen((prev) => !prev);
  if (error) <FailedDataDialog error={error} />;
  if (isLoading || !data) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <PageLoader />
      </div>
    );
  }
  const normalize = data && normalizePreviewData(data);

  const videoTrailer = normalize.videos.results.find(
    (v) => v.type === "Trailer",
  );
  if (isLoading) <Skeleton height={300} width="100%" />;
  return (
    <main
      className={`w-full h-full flex flex-col gap-2 ${theme === "light" ? "bg-light text-dark" : "bg-dark text-light"}`}
    >
      <button
        className="bg-white text-dark text-start py-0.5 px-1 mt-3 w-[90%] rounded-lg tablet:w-40 tablet:mt-3 tablet:ml-3"
        onClick={toggleModal}
      >
        Search...
      </button>
      {isModalOpen && <SearchUI isOpen={isModalOpen} onClose={toggleModal} />}
      <section className="relative w-full max-w-180">
        <div className="w-full max-w-180 max-h-25 tablet:max-h-100 aspect-video mb-5 relative pb-3 justify-self-center">
          <Suspense fallback={<LoaderCardPoster />}>
            <LiteYouTubeEmbed
              id={`${videoTrailer?.key}`}
              iframeClass="iframe-video"
              title="Youtube video player"
              lazyLoad={true}
              poster="maxresdefault"
              enableJsApi={true}
              focusOnLoad={true}
              autoplay={true}
              seo={{
                name: `${videoTrailer?.name}`,
                description: `Official video trailer of ${normalize.normalized?.normalizeTitle}`,
              }}
            />
          </Suspense>
        </div>
        <Suspense fallback={<LoaderCardPoster />}>
          <MediaBanner />
        </Suspense>

        <div className="px-3 text-pretty mt-5">
          <h2 className="text-heading-lg">Overview</h2>
          <p className="mt-2">{normalize.overview}</p>
        </div>
      </section>
      <LineBreak />
      <section className="relative">
        <h2 className="text-heading-md pt-3 pl-3 pb-1">Reviews</h2>

        <div className="max-w-180 px-5">
          <Suspense fallback={<PageLoader />}>
            <ReviewComponent media={params.media} id={params.id} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
