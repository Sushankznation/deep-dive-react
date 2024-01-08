// This component is used for login resister functionality
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../../../Redux/features/authSlice";
import { Button, Input } from "../../../UI";
import AuthService from "../../../AppWrite/auth";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);

  const login = async (data) => {
    setError("");
    try {
      const session = await AuthService.login({
        email: data.email,
        password: data.password,
      });
      if (session) {
        const userData = await AuthService.getCurrentUser();
        if (userData) dispatch(authLogin({ userData }));
        navigate("/");
      }
    } catch (error) {
      setError(error);
    }
  };
  return (
    <div
      className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
    >
      <div className="mb-2 flex justify-center">
        <span className="inline-block w-full max-w-[100px]">LOGO</span>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && (
          <p className="mt-2 text-center text-base text-red-500">{error}</p>
        )}
        {/* handleSubmit is the fixed Keyword in react-hook-form visit: "https://react-hook-form.com/get-started" for more */}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-x-5">
            <Input
              type="email"
              name="email"
              label="Email :"
              placeholder="Enter you email"
              // We need to spread this register every time because if we don't do this then it automatically overwrite the  previous value
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    value.includes(
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
                    ) || "email address must be a valid Mail id ",
                },
              })}
            />

            <Input
              type="password"
              name="password"
              label="Password :"
              placeholder="Enter you password"
              // We need to spread this register every time because if we don't do this then it automatically overwrite the  previous value
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
