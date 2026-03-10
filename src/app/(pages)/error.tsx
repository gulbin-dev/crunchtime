"use client";

export default function ErrorBoundary({ error }: { error: Error }) {
  let errorMessage = "";
  let errorName = "";
  if (error) {
    console.log(error.cause);
  }

  switch (error.cause) {
    case "Error: Client network socket disconnected before secure TLS connection was established": {
      errorName = "Network Error";
      errorMessage = "No Internet connection";
    }
  }
  return (
    <div className="w-full h-screen">
      <h2>{errorName}</h2>
      <p>{errorMessage}</p>
      <p>This is root error boundary</p>
    </div>
  );
}
