import { FetchResponse } from "@/src/app/utils/types";
import { cacheTag } from "next/cache";
import { MediaTypes, Response } from "../utils/types";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.Read_Access_Token}`,
  },
};
export async function discoverMedia(
  toFetch: string,
  genreParam: string[],
): Promise<Response<FetchResponse<MediaTypes>> | null> {
  "use cache";
  cacheTag("discover");
  const genre = genreParam.join("|");
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/${toFetch}?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc${genre !== "" ? `&with_genres=${genre}` : ""}`,
      options,
    );
    if (!response.ok) {
      return {
        data: undefined,
        error: {
          state: true,
          type: "HTTP_ERROR",
          status: response.status,
          message: "Failed to fetch data, please try again",
        },
      };
    }
    return {
      data: await response.json(),
      error: {
        state: false,
        type: "FETCH_SUCCESS",
        status: 200,
        message: "Data fetched successfully",
      },
    };
  } catch {
    return {
      data: undefined,
      error: {
        state: true,
        type: "NETWORK_ERROR",
        status: 500,
        message:
          "Unstable network connection, please check your internet connection",
      },
    };
  }
}
