import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import productCategory from "../helper/productCategory";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { toast } from "react-hot-toast";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";

const EditProducts = ({ onClose, productId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [actualImages, setActualImages] = useState([]);
  const [loading,setLoading] = useState(false);

  const onSubmit = async (data) => {
    const imageUrls = [];

    // If no new images are uploaded and there are no existing images
    if (
      actualImages.length === 0 &&
      (!data.productImages || data.productImages.length === 0)
    ) {
      toast.error("Please upload at least one image");
      return;
    }

    // Upload new images to Cloudinary (if any)
    if (data.productImages && data.productImages.length > 0) {
      for (let i = 0; i < data.productImages.length; i++) {
        const formData = new FormData();
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
          toast.error("Error uploading image");
          return; // Exit the function if the upload fails
        }
      }
    }

    // Combine existing images with new uploaded ones
    const allImages = [...actualImages, ...imageUrls];

    const productData = {
      name: data.productName,
      category: data.productCategory,
      price: data.productPrice,
      sellingPrice: data.productSellingPrice,
      description: data.productDescription,
      images: allImages,
    };

    try {
      const productResponse = await axios.put(
        `http://localhost:8000/api/editProduct/${productId}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Product updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error updating product");
    }
  };

  // Fetch product data for editing
  const getProduct = async () => {
    setLoading(false);
    try {
      const singleProduct = await axios.get(
        `http://localhost:8000/api/singleProduct/${productId}`
      );
      const { name, category, price, sellingPrice, description, images } =
        singleProduct.data.product;

      // Set form values with the fetched product data
      setValue("productName", name);
      setValue("productCategory", category);
      setValue("productPrice", price);
      setValue("productSellingPrice", sellingPrice);
      setValue("productDescription", description);

      // Parse the images JSON and set the existing images
      const parsedImages = JSON.parse(images);
      setActualImages(parsedImages);
      setLoading(true);
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Error fetching product data");
    }
  };

  useEffect(() => {
    getProduct();
  }, [productId]);

  return (
    <>
      <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
        <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-auto">
          <div className="flex justify-between">
            <h3 className="font-bold">Edit Product</h3>
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

              {/* Product Images */}
              <div className="py-3">
                <label
                  htmlFor="productImages"
                  className="justify-center text-center items-center flex text-sm font-medium text-gray-900 rounded-lg cursor-pointer border-orange-300 border-[1px] h-[100px]"
                >
                  <div className="text-center">
                    <div className="text-[50px] text-orange-500 justify-center flex">
                      <FaCloudUploadAlt />
                    </div>
                    <div className="">Upload Images</div>
                  </div>

                  <input
                    id="productImages"
                    name="productImages"
                    {...register("productImages")}
                    type="file"
                    multiple
                    className=" hidden px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600"
                  />
                </label>
                {errors.productImages && (
                  <span className="text-red-500 text-sm">
                    {errors.productImages.message}
                  </span>
                )}
                {/* Display pre-uploaded images */}
                {
                  loading ? (<div className="mt-2 flex gap-2 flex-wrap">
                  
                    {actualImages.map((el, index) => (
                      <img
                        key={index}
                        src={el}
                        alt={`Product ${index}`}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                    ))}
                  </div>) : "LOADING..."
                }
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
                />
                {errors.productDescription && (
                  <span className="text-red-500 text-sm">
                    {errors.productDescription.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="mt-4 inline-flex justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                Upload Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProducts;
