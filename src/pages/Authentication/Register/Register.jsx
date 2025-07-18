import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import useAxios from "../../../hooks/useAxios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser , updateUserProfile} = useAuth();
  const [profilePic, setProfilePic] = useState('');
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then(async(result) => {
        console.log(result.user);
        // update user profile in database
        const userInfo = {
          email: data.email,
          role: 'user', // default role
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        }


        const userRes = await axiosInstance.post('/users', userInfo);

        console.log(userRes.data);

        // update user profile in firebase
        const userProfile = {
          displayName: data.name,
          photoURL : profilePic
        }
        updateUserProfile(userProfile)
        .then(() =>{
          console.log('profile name pic updated ');
          navigate('/')
        })
        .catch(error =>{
          console.log(error)
        })

      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleImageUpload = async(e) =>{
    const image = e.target.files[0];
    console.log(image)
    const formData = new FormData();
    formData.append('image', image);
    
    const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`
    const res =await axios.post(imagUploadUrl, formData);

    setProfilePic(res.data.data.url)
  } 

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-5xl font-bold">Create account!</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            {/* name field */}
            <label className="label">Your Name</label>
            <input
              {...register("name", { required: true })}
              type="text"
              className="input"
              placeholder="Name"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Name is required</p>
            )}

            {/* name field */}
            <label className="label">Photo Url</label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="input"
              placeholder="Your Profile Picture"
            />

            {/* email field */}
            <label className="label">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              className="input"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}

            {/* password field */}
            <label className="label">Password</label>
            <input
              {...register("password", { required: true, minLength: 6 })}
              type="password"
              className="input"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">password required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">password must be six character</p>
            )}

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn text-black bg-[#CAEB66] mt-4">
              Register
            </button>
          </fieldset>
          <p>
            Already have an account?
            <Link className="text-blue-500 link-hover " to="/login">
              Login
            </Link>
          </p>
        </form>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Register;
