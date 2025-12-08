import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { LoginService, type ILoginRequest } from "../services/authservice";
import type { IApiResponse } from "../models/response/IApiResponse";
import type { ILoginResponse } from "../models/response/ILoginResponse";
import toast from "react-hot-toast";

export default function Login() {
  const { register, handleSubmit, formState, reset } = useForm<ILoginRequest>();
  const navigate = useNavigate();
  async function handleLogin(data: ILoginRequest) {
    const loginResponse = await LoginService(data);
    const loginData: IApiResponse<ILoginResponse> = loginResponse?.data;
    if (loginResponse?.status === 200 && loginResponse.statusText === "OK") {
      localStorage.setItem("token", loginData.token);
      toast.success(loginData.message);
      navigate("/app/document-list", { replace: true });
    } else {
      toast.error("Invalid email or password");
      reset();
    }
  }
  return (
    <div className="drop-shadow-xl px-8 py-6 w-1/3 rounded-xl bg-(--color-grey-50)">
      <h3 className="text-5xl mb-1 text-(--color-brand-600) font-semibold">
        Login
      </h3>
      <p className="text-[1.25rem] text-gray-600">
        Enter your details to login
      </p>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="mt-8 flex flex-col gap-6"
      >
        <div>
          <label htmlFor="email">Email</label>
          <input
            className="w-full"
            type="email"
            id="email"
            disabled={formState.isSubmitting}
            {...register("email", {
              required: { message: "Email is required", value: true },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
          />
          <p className="text-[1.25rem] text-red-600">
            {formState.errors.email?.message}
          </p>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            className="w-full"
            type="password"
            id="password"
            disabled={formState.isSubmitting}
            {...register("password", {
              required: { message: "Password is required", value: true },
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          <p className="text-[1.25rem] text-red-600">
            {formState.errors.password?.message}
          </p>
        </div>
        <button
          className="login-register-button mt-4"
          disabled={formState.isSubmitting}
        >
          <span className="login-register-button-content">Log In</span>
        </button>
      </form>
      <p className="text-[1.25rem] mt-2">
        Don't have an account?{" "}
        <Link
          to={"/auth/register"}
          className={`text-(--color-brand-600) ${
            formState.isSubmitting ? "pointer-events-none opacity-50" : ""
          }`}
        >
          Register
        </Link>
      </p>
    </div>
  );
}
