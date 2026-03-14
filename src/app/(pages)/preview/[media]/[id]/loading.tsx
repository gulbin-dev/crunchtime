"use client";
import PageLoader from "@components/ui/PageLoader";
import { useTheme } from "@utils/zustand/theme";
export default function PreviewLoading() {
  const theme = useTheme((state) => state.theme);
  return (
    <div
      className={`h-screen w-full flex items-center justify-center ${theme === "light" ? "bg-light" : "bg-dark"}`}
    >
      <PageLoader />
    </div>
  );
}
