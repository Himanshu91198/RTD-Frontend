import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <Outlet />
    </div>
  );
}
