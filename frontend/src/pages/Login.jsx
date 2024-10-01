import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Image from "../assets/register.jpg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Assuming you are using React Router for navigation
import toast from "react-hot-toast";
import Context from "../context";


export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate(); // For navigation after successful login
  const { fetchUserDetails } = useContext(Context); 
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        data
      );
      
      // Assuming the API returns a token and user details on successful login
      const { token, user } = response.data;

      // Store the token and user details (e.g., in localStorage or sessionStorage)
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));
      
      
      toast.success("logged In");
      fetchUserDetails();
      navigate("/admin");
    } catch (error) {
      // Handle login errors (e.g., incorrect email/password)
      console.log(error);
      toast.error("Invalid Credential");
    }
  };

  return (
    <>
      <div
        className="w-full h-[100vh] items-center flex justify-end"
        style={{
          backgroundImage: `url(${Image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-2/5 pr-[120px]">
          <div className="bg-white rounded py-[50px] px-[30px] shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="pb-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    autoComplete="email"
                    className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="pb-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    type="password"
                    autoComplete="password"
                    className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.password && (
                    <span className="text-red-500 text-sm">
                      {errors.password.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-3 bg-orange-500 text-center rounded hover:bg-blue-500">
                <button className="w-[100%] text-white py-2" type="submit">
                  Login
                </button>
              </div>
              <div className="pt-3 text-end">
                <p className="text-sm">
                  Don't have account?{" "}
                  <Link className="text-orange-500" to="/register">
                    Register here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
