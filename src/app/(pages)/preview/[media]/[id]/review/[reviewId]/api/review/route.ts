import { NextRequest, NextResponse } from "next/server";
import {
  mediaTypeChecker,
  preventPathTraversal,
} from "@utils/serverPathChecker";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const mediaParams = searchParams.get("media");
  const idParams = searchParams.get("id");
  const media = mediaTypeChecker(mediaParams!);
  const id = preventPathTraversal(idParams!);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/${media}/${id}/reviews?language=en-US&page=1`,
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
