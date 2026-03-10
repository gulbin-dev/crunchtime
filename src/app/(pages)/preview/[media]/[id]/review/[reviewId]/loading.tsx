import PageLoader from "@/src/app/components/UI/PageLoader";

export default function ReviewLoading() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <PageLoader />
    </div>
  );
}
