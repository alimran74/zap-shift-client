import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        navigate(from)
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-5xl font-bold">Login Please!</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              {...register("email")}
              type="email"
              className="input"
              placeholder="Email"
            />

            <label className="label">Password</label>
            <input
              {...register("password", { required: true, minLength: 8 })}
              type="password"
              className="input"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">Password must be 8 charecter</p>
            )}

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>

            <button className="btn text-black bg-[#CAEB66] mt-4">Login</button>
          </fieldset>
          <p>
            Don't have Account?
            <Link className="text-blue-500 link-hover " to="/register">
              register
            </Link>
          </p>
        </form>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
