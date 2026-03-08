import { CiImageOff } from "react-icons/ci";

export default function AvatarPlaceholder() {
  return (
    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
      <CiImageOff className="text-heading-xl" />
    </div>
  );
}
