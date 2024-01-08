import { Input, Button } from "../../../UI";
import { useState } from "react";
import { authService } from "../../../AppWrite/auth";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);

  const create = async (data) => {
    setError("");
    try {
      const session = await authService.signup({
        email: data.email,
        password: data.password,
      });
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authService({ userData }));
        navigate("/");
      }
    } catch (error) {
      setError(error);
    }
  };
  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="mb-2 flex justify-center">
        <span className="inline-block w-full max-w-[100px]">SignUp</span>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Have an account ?
        </h2>
        <Link
          to="/login"
          className="font-medium text-primary transition-all duration-200 hover:underline"
        >
          Sign Up
        </Link>
        {error && <p className="text-red-500">{error.message}</p>}
        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
