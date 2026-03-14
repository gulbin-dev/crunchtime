"use client";
import PageLoader from "@/app/components/UI/PageLoader";
import { useTheme } from "@utils/zustand/theme";
export default function ReviewLoading() {
  const theme = useTheme((state) => state.theme);
  return (
    <div
      className={`h-screen w-full flex items-center justify-center ${theme === "light" ? "bg-light" : "bg-dark"}`}
    >
      <PageLoader />
    </div>
  );
}
