"use client";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useTheme } from "@utils/zustand/theme";
export default function PageLoader({
  defaultColor,
}: {
  defaultColor?: string;
}) {
  const theme = useTheme((state) => state.theme);
  const hasDefaultColor = defaultColor !== undefined;
  return (
    <div
      className={`flex gap-1 ${hasDefaultColor ? defaultColor : ""}  ${theme === "light" ? "text-dark" : "text-light"}`}
    >
      <p>Loading</p>
      <AiOutlineLoading3Quarters className="animate-spin" />
    </div>
  );
}
