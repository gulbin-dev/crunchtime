"use client";

import { FetchResponse, Review } from "../utils/types";
import Image from "next/image";
import AvatarPlaceholder from "./ui/AvatarPlaceholder";
import { useLayoutEffect, useRef, useState } from "react";
import ShowMoreBtn from "./ui/ShowMoreBtn";
import useSWR from "swr";
import { ParamValue } from "next/dist/server/request/params";
import Link from "next/link";
import { avatarPathChecker } from "../utils/avatarPathChecker";
import { fetcher } from "../utils/swr/fetcher";

export default function ReviewComponent({
  media,
  id,
  reviewID,
}: {
  media: ParamValue;
  id: ParamValue;
  reviewID?: string;
}) {
  const [pageIndex, setPageIndex] = useState(1);
  const { data, error } = useSWR(
    `/preview/${media}/${id}/api/review?media=${media}&id=${id}&page=${pageIndex}`,
    (url) => fetcher<FetchResponse<Review[]>>(url),
    { suspense: true },
  );
  const containerRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [overflowingIds, setOverflowingIds] = useState<Record<string, boolean>>(
    {},
  );
  useLayoutEffect(() => {
    const newOverflows: Record<string, boolean> = {};
    const observer = new ResizeObserver((entries) => {
      let changed = false;

      entries.forEach((entry) => {
        const id = entry.target.getAttribute("data-id");
        if (id) {
          const isOverflowing = entry.target.scrollHeight > 250;
          if (overflowingIds[id] !== isOverflowing) {
            newOverflows[id] = isOverflowing;
            changed = true;

            // Apply styles manually to avoid a second state-driven render loop
            const el = entry.target as HTMLDivElement;
            if (isOverflowing) {
              el.style.height = "250px";
              el.style.overflow = "hidden";
            } else {
              el.style.height = "auto";
              el.style.paddingBottom = "24px";
            }
          }
        }
      });

      if (changed) {
        setOverflowingIds((prev) => ({ ...prev, ...newOverflows }));
      }
    });

    containerRefs.current.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });

  const showMoreBtn = data.results.length > 5 ? <ShowMoreBtn /> : null;
  return (
    <>
      <ul className="list-none p-0 relative text-dark px-3">
        {data.results
          .slice(0, 5)
          .filter((item) => item.id !== reviewID || "")
          .map((item) => {
            const isUpdated = item.updated_at
              ? item.updated_at.length > 0
              : false;
            const chekerResult = avatarPathChecker(
              item.author_details.avatar_path,
            );

            const createdDate = new Date(item.created_at).toLocaleDateString(
              "en-US",
              { year: "numeric", month: "long", day: "numeric" },
            );
            const updateDate = new Date(
              item.updated_at || "",
            ).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });

            return (
              <li
                key={item.id}
                className="mt-3 border-b border-gray-shade/10 pb-4 "
              >
                <div className="bg-secondary rounded-sm px-2 pt-2 tablet:rounded-xl">
                  <Link href={`/preview/${media}/${id}/review/${item.id}}`}>
                    <div className="grid grid-cols-[45px_1fr] gap-3">
                      {chekerResult ? (
                        <Image
                          src={chekerResult}
                          alt=""
                          width={45}
                          height={45}
                          className="rounded-full h-[45px] object-cover"
                        />
                      ) : (
                        <AvatarPlaceholder />
                      )}

                      <div>
                        <h4 className="font-bold">{item.author}</h4>

                        {isUpdated ? (
                          <p className="text-xs flex gap-1 items-center mt-1">
                            {updateDate}
                            <span className="italic rounded bg-tertiary py-0.2 px-1">
                              Updated
                            </span>
                          </p>
                        ) : (
                          <p className="text-xs mt-1">{createdDate}</p>
                        )}
                      </div>
                    </div>
                  </Link>

                  <div
                    className="mt-3"
                    data-id={item.id}
                    ref={(el) => {
                      if (el) containerRefs.current.set(item.id, el);
                      else containerRefs.current.delete(item.id);
                    }}
                    style={{ lineHeight: "1.5" }}
                  >
                    <q className="italic text-pretty">{item.content}</q>
                  </div>
                </div>

                {overflowingIds[item.id] && (
                  <div className="flex justify-end mt-1">
                    <Link
                      href={`/preview/${media}/${id}/review/${item.id}}`}
                      className="text-cta font-bold text-xs hover:underline"
                    >
                      ... read more
                    </Link>
                  </div>
                )}
              </li>
            );
          })}
        {showMoreBtn}
        {data.results.length === 0 && (
          <p className="italic text-center my-3">No reviews found.</p>
        )}
      </ul>
      <div className="flex mt-3 justify-center gap-5 pb-3">
        <button
          className="bg-cta text-light py-0.5 px-1.5 rounded-md"
          onClick={() => setPageIndex(pageIndex > 1 ? pageIndex - 1 : 1)}
        >
          Previous
        </button>
        <button
          className="bg-cta text-light py-0.5 px-1.5 rounded-md"
          onClick={() => setPageIndex(pageIndex + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}
