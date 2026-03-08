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
const fetcher = (url: string): Promise<Preview> =>
  fetch(url).then((res) => res.json());

export default function PreviewPage() {
  const params = useParams();
  const { data } = useSWR(
    `/preview/${params.media}/${params.id}/api/preview?media=${params.media}&id=${params.id}`,
    (url) => fetcher(url),
  );

  const normalize = data && normalizePreviewData(data);
  if (normalize === undefined) return null;

  const videoTrailer = normalize.videos.results.find(
    (v) => v.type === "Trailer",
  );

  return (
    <>
      <main className="w-full h-full flex flex-col items-center gap-2">
        <section className="relative text-dark w-full max-w-180">
          <div className="w-full max-w-180 max-h-25 tablet:max-h-100 aspect-video mb-5 relative pb-3 justify-self-center">
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

          <div className="max-w-180">
            <ReviewComponent media={params.media} id={params.id} />
          </div>
        </section>
      </main>
    </>
  );
}
