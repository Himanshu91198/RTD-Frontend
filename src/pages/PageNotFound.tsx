import { FaRegSadTear } from "react-icons/fa";

export default function PageNotFound() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex items-center gap-3 px-6 py-4 text-md">
        <FaRegSadTear className="text-xl" />
        <span>Page Not Found</span>
      </div>
    </div>
  );
}
