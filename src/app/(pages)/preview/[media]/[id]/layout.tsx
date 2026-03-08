import { SkeletonTheme } from "react-loading-skeleton";
export default function PreviewLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SkeletonTheme baseColor="#bcbcbc" highlightColor="#393939">
      {children}
    </SkeletonTheme>
  );
}
