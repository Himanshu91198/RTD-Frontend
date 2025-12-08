import { MdLogout } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import { GetUserName } from "../services/authservice";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";

export default function Header() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/auth/login", { replace: true });
  }

  return (
    <header className="flex items-center w-full justify-between bg-(--color-grey-50) border-b border-(--color-grey-200) px-10 py-6 z-20">
      <Link to={"/app/document-list"}>
        <img className="w-32 h-12" src={Logo} alt="real-time-docs" />
      </Link>
      <div className="flex items-center gap-3">
        <p className="text-[500] mr-5 text-(--color-brand-500)">
          Welcome {GetUserName() || "Guest"}!
        </p>

        <button
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Logout"
          className="border-0"
          type="button"
          onClick={() => handleLogout()}
        >
          <MdLogout className="text-4xl hover:text-(--color-brand-500)" />
        </button>
        <Tooltip
          id="my-tooltip"
          place="bottom"
          className="!py-2 !px-4 !text-[1.25rem] !rounded-md !bg-gray-800 !text-white"
        />
      </div>
    </header>
  );
}
