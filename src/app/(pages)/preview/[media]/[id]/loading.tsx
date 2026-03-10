import PageLoader from "@/src/app/components/UI/PageLoader";

export default function PreviewLoading() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <PageLoader />
    </div>
  );
}
