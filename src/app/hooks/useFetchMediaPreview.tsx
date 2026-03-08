"use client";
import useSWR from "swr";
import { Preview } from "../utils/types";

//  types
interface OptionType<T> {
  method: T;
  headers: {
    accept: T;
    Authorization: T;
  };
  cache: RequestCache | undefined;
  signalController: AbortType;
}
type AbortType = AbortSignal;

//  controller
const controller = new AbortController();
const signalController = controller.signal;

const options: OptionType<string> = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_Read_Access_Token}`,
  },
  cache: "force-cache", // Corrected position
  signalController,
};
const fetcher = (url: string, token: OptionType<string>): Promise<Preview> =>
  fetch(url, token).then((res) => {
    try {
      if (!res.ok) throw new Error("Failed to fetch data");
      return res.json();
    } catch (error) {
      if (error instanceof TypeError) {
        // Logic for network failures/DNS issues
        console.error(`Network Error - ${error.name}: ${error.message}`);
      } else if (error instanceof Error) {
        // Logic for your manual "throw new Error" (the HTTP status)
        console.error(`HTTP Error - Status: ${error.message}`);
      } else if (error instanceof AbortController) {
        console.error("Fetch Aborted");
      }
      throw error;
    } finally {
      controller.abort();
    }
  });
export default function useFetchMediaPreview(
  mediaType: string[] | string | undefined,
  id: string[] | string | undefined,
) {
  const { data, isLoading, error, isValidating } = useSWR(
    [
      `https://api.themoviedb.org/3/${mediaType}/${id}?append_to_response=videos,images,credits,recommendations,reviews,similar&language=en-US`,
      options,
    ],
    ([url, token]) => fetcher(url, token),
    { suspense: true },
  );
  return { data, isLoading, error, isValidating };
}
