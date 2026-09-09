import { NextRequest, NextResponse } from "next/server";
import {
  mediaTypeChecker,
  preventPathTraversal,
} from "@utils/serverPathChecker";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const mediaPatams = searchParams.get("media");
  const idParams = searchParams.get("id");

  const media = mediaTypeChecker(mediaPatams!);
  const id = preventPathTraversal(idParams!);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/${media}/${id}?append_to_response=videos,images,credits,recommendations,similar&language=en-US`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.Read_Access_Token}`,
      },
      signal: request.signal,
    },
  );
  const data = await response.json();
  return NextResponse.json(data);
}
