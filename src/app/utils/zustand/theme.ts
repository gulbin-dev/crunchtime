import { create } from "zustand";

interface ThemeProp {
  theme: "light" | "dark";
  setTheme: () => void;
}

export const useTheme = create<ThemeProp>((set) => ({
  theme: "light",
  setTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
}));
