import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  "use server";
  revalidateTag("discover", "max");
  const { searchParams } = request.nextUrl;
  const mediaType = searchParams.get("mediaType");
  const genre = searchParams.get("genre");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/discover/${mediaType}?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc${genre !== "" ? `&with_genres=${genre}` : ""}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.Read_Access_Token}`,
      },
    },
  );
  const data = await response.json();
  return NextResponse.json(data);
}
