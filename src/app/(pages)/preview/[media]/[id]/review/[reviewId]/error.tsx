"use client";
export default function ReviewErrorBoundary({ error }: { error: Error }) {
  return (
    <div>
      <h2>{error.name}</h2>
      <p>{error.message}</p>
    </div>
  );
}
