import { AiOutlineLoading3Quarters } from "react-icons/ai";
export default function PageLoader() {
  return (
    <div className="flex gap-1">
      <p>Loading</p>
      <AiOutlineLoading3Quarters className="animate-spin" />
    </div>
  );
}
