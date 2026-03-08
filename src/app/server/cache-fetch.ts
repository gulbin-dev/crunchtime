import { FetchResponse, Genres, MediaTypes } from "../utils/types";

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
export async function trendingList(): Promise<FetchResponse<MediaTypes>> {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/trending/all/week?language=en-US",
      options,
    );
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const data: FetchResponse<MediaTypes> = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
export async function movieGenreList(): Promise<Genres> {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list",
      options,
    );
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const data: Genres = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
export async function tvGenreList(): Promise<Genres> {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/genre/tv/list",
      options,
    );
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const data: Genres = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
