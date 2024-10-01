import React from "react";
import { useForm } from "react-hook-form";
import productCategory from "../helper/productCategory";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {toast} from "react-hot-toast"
import axios from "axios";

const UploadProducts = ({ onClose,onUploadSuccess  }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    const imageUrls = [];

    for (let i = 0; i < data.productImages.length; i++) {
      formData.append("file", data.productImages[i]);
      formData.append("upload_preset", "laravel_products");
      formData.append("cloud_name", "dlceegv39");

      try {
        const imageResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dlceegv39/image/upload",
          formData
        );
        imageUrls.push(imageResponse.data.url);
        console.log(imageResponse)
      } catch (error) {
        console.error("Error uploading image: ", error);
        return; // Exit the function if the upload fails
      }
    }
    console.log(imageUrls)
    const productData = {
        name:data.productName,
        category:data.productCategory,
        price:data.productPrice,
        sellingPrice:data.productSellingPrice,
        description:data.productDescription,
        images:imageUrls
    }
    console.log(productData)
    try {
        const productResponse = await axios.post("http://localhost:8000/api/products",productData,{
            headers:{
                Authorization:`Bearer ${sessionStorage.getItem('token')}`,
                "Content-Type":"application/json"
            }
        });
        toast.success('Product created successfully!')
        onClose();
        onUploadSuccess();
        console.log("Product created successfully:", productResponse.data);
    } catch (error) {
        console.error(error)
    }
  };

  return (
    <>
      <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
        <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-auto">
          <div className="flex justify-between">
            <h3 className="font-bold">Upload Products</h3>
            <div
              onClick={onClose}
              className="font-bold text-[26px] cursor-pointer hover:shadow-2xl"
            >
              <AiOutlineCloseCircle />
            </div>
          </div>
          <div className="p-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Product Name */}
              <div className="pb-3">
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium text-gray-900"
                >
                  Product Name
                </label>
                <input
                  id="productName"
                  name="productName"
                  {...register("productName", {
                    required: "Product name is required",
                  })}
                  type="text"
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600"
                />
                {errors.productName && (
                  <span className="text-red-500 text-sm">
                    {errors.productName.message}
                  </span>
                )}
              </div>

              {/* Product Category */}
              <div className="pb-3">
                <label
                  htmlFor="productCategory"
                  className="block text-sm font-medium text-gray-900"
                >
                  Product Category
                </label>
                <select
                  id="productCategory"
                  name="productCategory"
                  {...register("productCategory", {
                    required: "Product category is required",
                  })}
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600"
                >
                  <option value="">Select Category</option>
                  {productCategory.map((el, index) => (
                    <option value={el.value} key={el.value + index}>
                      {el.label}
                    </option>
                  ))}
                </select>
                {errors.productCategory && (
                  <span className="text-red-500 text-sm">
                    {errors.productCategory.message}
                  </span>
                )}
              </div>

              {/* Product Image */}
              <div className="pb-3">
                <label
                  htmlFor="productImages"
                  className="block text-sm font-medium text-gray-900"
                >
                  Product Images
                </label>
                <input
                  id="productImages"
                  name="productImages"
                  {...register("productImages", {
                    required: "At least one product image is required",
                  })}
                  type="file"
                  multiple // Allow multiple image uploads
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600"
                />
                {errors.productImages && (
                  <span className="text-red-500 text-sm">
                    {errors.productImages.message}
                  </span>
                )}
              </div>

              {/* Product Price */}
              <div className="pb-3">
                <label
                  htmlFor="productPrice"
                  className="block text-sm font-medium text-gray-900"
                >
                  Product Price
                </label>
                <input
                  id="productPrice"
                  name="productPrice"
                  {...register("productPrice", {
                    required: "Product price is required",
                  })}
                  type="text"
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600"
                />
                {errors.productPrice && (
                  <span className="text-red-500 text-sm">
                    {errors.productPrice.message}
                  </span>
                )}
              </div>

              {/* Product Selling Price */}
              <div className="pb-3">
                <label
                  htmlFor="productSellingPrice"
                  className="block text-sm font-medium text-gray-900"
                >
                  Product Selling Price
                </label>
                <input
                  id="productSellingPrice"
                  name="productSellingPrice"
                  {...register("productSellingPrice", {
                    required: "Product selling price is required",
                  })}
                  type="text"
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600"
                />
                {errors.productSellingPrice && (
                  <span className="text-red-500 text-sm">
                    {errors.productSellingPrice.message}
                  </span>
                )}
              </div>

              {/* Product Description */}
              <div className="pb-3">
                <label
                  htmlFor="productDescription"
                  className="block text-sm font-medium text-gray-900"
                >
                  Product Description
                </label>
                <textarea
                  id="productDescription"
                  name="productDescription"
                  {...register("productDescription", {
                    required: "Product description is required",
                  })}
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600"
                ></textarea>
                {errors.productDescription && (
                  <span className="text-red-500 text-sm">
                    {errors.productDescription.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-[100%] rounded-sm bg-blue-500 text-white px-4 py-2 shadow-md hover:bg-blue-600"
                >
                  Upload Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadProducts;
