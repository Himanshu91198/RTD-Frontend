import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <Outlet />
    </main>
  );
}
