"use client";
import { Preview } from "@/src/app/utils/types";
import { useParams } from "next/navigation";
import { normalizePreviewData } from "@/src/app/utils/normalizeData";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import useSWR from "swr";
import ReviewComponent from "@/src/app/components/ReviewComponent";
import { Suspense } from "react";
import MediaBanner from "@/src/app/components/MediaBanner";
import LineBreak from "@/src/app/components/UI/LineBreak";
import LoaderCardPoster from "@/src/app/components/UI/LoaderCardPoster";
import FailedDataDialog from "@/src/app/components/UI/Error/FailedDataDialog";
import PageLoader from "@/src/app/components/UI/PageLoader";
import Skeleton from "react-loading-skeleton";
const fetcher = (url: string): Promise<Preview> =>
  fetch(url).then((res) => res.json());

export default function PreviewPage() {
  const params = useParams();
  const { data, error, isLoading } = useSWR(
    `/preview/${params.media}/${params.id}/api/preview?media=${params.media}&id=${params.id}`,
    (url) => fetcher(url),
  );
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
    <main className="w-full h-full flex flex-col items-center gap-2">
      <section className="relative text-dark w-full max-w-180">
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
