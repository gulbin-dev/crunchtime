"use client";
import MediaBanner from "@/src/app/components/MediaBanner";
import { FetchResponse, Review } from "@/src/app/utils/types";
import { redirect, RedirectType, useParams } from "next/navigation";
import useSWR from "swr";
import ReviewComponent from "@/src/app/components/ReviewComponent";
import LineBreak from "@/src/app/components/UI/LineBreak";
import { IoChevronBack } from "react-icons/io5";
import PageLoader from "@/src/app/components/UI/PageLoader";
const fetcher = (url: string): Promise<FetchResponse<Review[]>> =>
  fetch(url).then((res) => res.json());
export default function ReviewPage() {
  const params = useParams();
  const { data, error } = useSWR(
    `/preview/${params.media}/${params.id}/review/${params.reviewId}/api/review?media=${params.media}&id=${params.id}`,
    (url) => fetcher(url),
  );
  if (error) console.error(error);
  if (!data)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <PageLoader />
      </div>
    );

  const review = data.results.filter(
    (item) => item.id === params.reviewId?.slice(0, -3),
  );
  console.log(review[0]);
  const isUpdated = review[0].updated_at
    ? review[0].updated_at.length > 0
    : false;
  const createdDate = new Date(review[0].created_at).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );
  const updateDate = new Date(
    isUpdated ? review[0].updated_at : "",
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <main className="w-full max-w-180 h-auto justify-self-center">
      <button
        className="ml-3 bg-cta rounded-full p-1"
        onClick={() =>
          redirect(
            `/preview/${params.media}/${params.id}`,
            RedirectType.replace,
          )
        }
      >
        <IoChevronBack className=" text-light text-2xl" />
      </button>
      <MediaBanner />

      <div className="flex flex-col gap-2 mt-2 px-3 h-fit p-1">
        <h1>
          Review by <em>{review[0].author}</em>
        </h1>
        {isUpdated ? (
          <p className="text-xs flex gap-1 items-center">
            <span className="italic p-0.5 rounded bg-gray-shade">Updated</span>
            {updateDate}
          </p>
        ) : (
          <p className="text-xs ">{createdDate}</p>
        )}

        <q className="block text-pretty leading-relaxed ">
          {review[0].content}
        </q>
      </div>
      <LineBreak />
      <div>
        <h2 className="text-heading-md ml-3">Other reviews</h2>
        {data.results
          .filter((item) => item.id !== review[0].id)
          .map((item) => (
            <ReviewComponent
              key={item.id}
              media={params.media}
              id={params.id}
              reviewID={params.reviewId?.slice(0, -3).toString()}
            />
          ))}
      </div>
    </main>
  );
}
