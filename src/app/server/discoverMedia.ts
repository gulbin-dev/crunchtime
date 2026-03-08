import { cacheTag } from "next/cache";
import { FetchResponse, MediaTypes } from "../utils/types";
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
): Promise<FetchResponse<MediaTypes>> {
  "use cache";
  cacheTag("discover");
  const genre = genreParam.join("|");
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/${toFetch}?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc${genre !== "" ? `&with_genres=${genre}` : ""}`,
      options,
    );
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    return response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      console.error(`Network Error - ${error.name}: ${error.message}`);
    } else if (error instanceof Error) {
      console.error(`HTTP Error - Status: ${error.message}`);
    } else if (error instanceof AbortController) {
      console.error("Fetch Aborted");
    }
    throw error;
  }
}
