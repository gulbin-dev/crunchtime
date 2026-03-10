"use client";
import isOnline from "is-online";
export default async function useInternetConnection() {
  const isUserOnline = await isOnline();
  if (!isUserOnline) {
    return false;
  }
  return true;
}
