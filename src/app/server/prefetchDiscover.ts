import { NextRequest, NextResponse } from "next/server";

export async function preFetchDiscover(request: NextRequest) {
  const mediaType = request.nextUrl.searchParams.get("mediaType");
  const genre = request.nextUrl.searchParams.get("genre");

  if (!mediaType || !genre) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/${mediaType}?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `bearer ${process.env.Read_Access_Token}`,
        },
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch data" },
        { status: response.status },
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
