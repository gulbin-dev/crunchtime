import { FetchResponse } from "@/src/app/utils/types";
import { Response, Genres, MediaTypes } from "../utils/types";

//  defining Authorization for every 'GET' request
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.Read_Access_Token}`,
    cache: "force-cache",
  },
};

//  fetching list of   `Movie`, `Tv shows` and `People`
export async function trendingList(): Promise<
  Response<FetchResponse<MediaTypes>>
> {
  "use cache";
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/trending/all/week?language=en-US",
      options,
    );
    if (!response.ok) {
      throw {
        data: undefined,
        error: {
          state: true,
          type: "HTTP_ERROR",
          status: response.status,
          message: "Failed to fetch data, please try again",
        },
      };
    }
    return await response.json();
  } catch {
    throw {
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
export async function movieGenreList(): Promise<Response<Genres>> {
  "use cache";
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list",
      options,
    );
    if (!response.ok) {
      throw {
        data: undefined,
        error: {
          state: true,
          type: "HTTP_ERROR",
          status: response.status,
          message: "Failed to fetch data, please try again",
        },
      };
    }
    return await response.json();
  } catch {
    throw {
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
export async function tvGenreList(): Promise<Response<Genres>> {
  "use cache";
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/genre/tv/list",
      options,
    );
    if (!response.ok) {
      throw {
        data: undefined,
        error: {
          state: true,
          type: "HTTP_ERROR",
          status: response.status,
          message: "Failed to fetch data, please try again",
        },
      };
    }
    return await response.json();
  } catch {
    throw {
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
