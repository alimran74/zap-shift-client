import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
        <SocialLogin/>
      </div>
    </div>
  );
};

export default Login;
