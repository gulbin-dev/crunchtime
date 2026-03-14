import { Response, Genres } from "../utils/types";
import { cacheLife } from "next/cache";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.Read_Access_Token}`,
    cache: "force-cache",
  },
};
export async function tvGenreList(): Promise<Response<Genres>> {
  "use cache";
  cacheLife("weeks");
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
