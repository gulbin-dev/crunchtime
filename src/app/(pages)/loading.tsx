import PageLoader from "@components/ui/PageLoader";
export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <PageLoader />
    </div>
  );
}
