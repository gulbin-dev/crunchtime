import { connection } from "next/server";
import { SkeletonTheme } from "react-loading-skeleton";
export default async function PreviewLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await connection();
  return (
    <SkeletonTheme baseColor="#bcbcbc" highlightColor="#393939">
      {children}
    </SkeletonTheme>
  );
}
