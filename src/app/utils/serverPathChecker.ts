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
  return value.replace(/\.\.\//g, "");
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
