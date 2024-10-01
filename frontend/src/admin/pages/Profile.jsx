import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../store/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          console.error("No token found. Please log in.");
          return;
        }

        const response = await axios.get("http://localhost:8000/api/getAllUser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        const userData = response.data;

        // Pre-fill the form with user data
        setValue("name", userData.user.name);
        setValue("email", userData.user.email);
        setValue("phone", userData.user.phone);
        setValue("address", userData.user.address);
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.response && error.response.status === 401) {
          toast.error("Unauthorized. Please log in again.");
        }
      }
    };

    fetchUserData();
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      // Creating FormData to handle file upload
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("address", data.address);
      if (data.file && data.file.length > 0) {
        formData.append("file", data.file[0]); // For file input
      }

      // Sending the form data with axios
      const response = await axios.post(
        "http://localhost:8000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Token passed in headers
          },
        }
      );

      const { user } = response.data;
      dispatch(setUserDetails(user));

      toast.success("User updated successfully!");
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized. Please log in again.");
      } else {
        toast.error("Error updating profile.");
      }
    }
  };

  return (
    <div className="">
      <div className="w-3/5 m-auto px-[50px] py-[30px] bg-blue-200 shadow-lg rounded-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-10">
            <div className="sm:col-span-3 pt-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  {...register("name")}
                  autoComplete="given-name"
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3 pt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  {...register("email")}
                  autoComplete="email"
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3 pt-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="number"
                  {...register("phone")}
                  autoComplete="tel"
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="pt-5">
              <label
                htmlFor="file"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Upload your profile
              </label>
              <div className="mt-2">
                <input
                  id="file"
                  name="file"
                  type="file"
                  {...register("file")}
                  className="px-3 block w-full rounded-md border-2 border-orange-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3 pt-4">
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Address
              </label>
              <div className="mt-2">
                <input
                  id="address"
                  name="address"
                  type="text"
                  {...register("address")}
                  autoComplete="street-address"
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="text-center pt-3">
              <button className="bg-orange-400 text-white shadow-xl px-5 py-2 rounded-md">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
