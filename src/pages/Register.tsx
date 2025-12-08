import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  RegisterService,
  type IRegisterRequest,
} from "../services/authservice";
import toast from "react-hot-toast";

export default function Register() {
  const { register, formState, handleSubmit, reset } =
    useForm<IRegisterRequest>();
  const navigate = useNavigate();
  async function handleRegister(data: IRegisterRequest) {
    const registeredResponse = await RegisterService(data);
    if (
      registeredResponse?.status === 201 &&
      registeredResponse.statusText === "Created"
    ) {
      navigate("/auth/login");
      toast.success("User registered successfully");
    } else {
      toast.error("Registration failed, Please try again");
      reset();
    }
  }
  return (
    <div className="drop-shadow-xl px-8 py-6 w-1/3 rounded-xl bg-(--color-grey-50)">
      <h3 className="text-5xl mb-1 text-(--color-brand-600) font-semibold">
        Let's get you started
      </h3>
      <p className="text-[1.25rem] text-gray-600">
        Enter your details to register
      </p>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="mt-8 flex flex-col gap-6"
      >
        <div>
          <label htmlFor="username">Username</label>
          <input
            className="w-full"
            type="text"
            id="username"
            {...register("username", {
              required: { message: "Username is required", value: true },
              maxLength: {
                message: "Max characteres allowed are 50",
                value: 50,
              },
            })}
          />
          <p className="text-[1.25rem] text-red-600">
            {formState.errors.username?.message}
          </p>
        </div>
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
          <span className="login-register-button-content">Register</span>
        </button>
      </form>
      <p className="text-[1.25rem] mt-2">
        Already have an account?{" "}
        <Link
          to={"/auth/login"}
          className={`text-(--color-brand-600) ${
            formState.isSubmitting ? "pointer-events-none opacity-50" : ""
          }`}
        >
          Login
        </Link>
      </p>
    </div>
  );
}
