import path from "path";
import type { CatalogType } from "@hooks/useCatalogState";

/**
 * Validates and normalizes the media type from search parameters.
 * Defends against unexpected input by defaulting safely to 'tv'.
 *
 * @param value raw string from searchParams
 * @returns 'movie' | 'tv'
 */
export const mediaTypeChecker = (
  value: string | null | undefined,
): CatalogType => {
  return value === "movie" ? "movie" : "tv";
};

/**
 * Prevents path traversal attacks by validating and ensuring the path
 * stays relative and does not contain escape sequences.
 *
 * @param value Path fragment from user input
 * @returns Clean path string or empty string if malicious
 */
export const preventPathTraversal = (value: string): string => {
  if (typeof value !== "string" || !value) return "";

  // 1. Decode URL encoded characters (e.g., %2e%2e%2f -> ../) to catch obfuscation
  let decoded = value;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    // Return empty if URI is malformed
    return "";
  }

  // 2. Normalize backslashes (Windows) to forward slashes
  const normalizedInput = decoded.replace(/\\/g, "/");

  // 3. Use path.posix.normalize to resolve relative segments like '.' and '..'
  const cleanPath = path.posix.normalize(normalizedInput);

  // 4. Reject the input entirely if it attempts to step up directories or go root
  if (
    cleanPath.startsWith("../") ||
    cleanPath.startsWith("..") ||
    path.isAbsolute(cleanPath)
  ) {
    return "";
  }

  return cleanPath;
};

/**
 * Validates sorting parameters.
 * Defends against SQL/API parameter injection by enforcing strict whitelisting.
 *
 * @param value raw string from searchParams
 * @returns 'asc' | 'desc'
 */
export const sortOrderChecker = (value: string | null): "asc" | "desc" => {
  return value === "asc" ? "asc" : "desc";
};

/**
 * Validates and enforces safe boundaries for pagination variables.
 * Prevents resource exhaustion and denial of service (DoS) attempts.
 *
 * @param value raw string from searchParams
 * @returns validated number between 1 and 500
 */
export const pageNumberChecker = (value: string | null): number => {
  const parsed = parseInt(value || "1", 10);
  // Ensure it's a real number, greater than 0, and capped at a reasonable limit
  if (isNaN(parsed) || parsed < 1 || parsed > 500) {
    return 1;
  }
  return parsed;
};
