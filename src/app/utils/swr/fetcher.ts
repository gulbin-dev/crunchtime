export const fetcher: <T>(url: string) => Promise<T> = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    throw error;
  }
  return res.json();
};
