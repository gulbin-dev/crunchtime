import { connection } from "next/server";

export const instant = false;
export default async function ReviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();
  return <>{children}</>;
}
