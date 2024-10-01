import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector } from "react-redux";

const SingleDetails = ({ id, onClose }) => {
  // Safely access the products state, with a fallback to an empty array
  const products = useSelector((state) => state?.products?.products || []);

  // Find the single product by ID
  const singleProduct = Array.isArray(products)
    ? products.find((single) => single.id === id)
    : null;

  // Destructure safely, fallback to empty values if singleProduct is null
  const { name, description, images, price, sellingPrice, category } =
    singleProduct || {};

  // Safely parse images if available
  let imageArray = [];
  if (images) {
    try {
      imageArray = JSON.parse(images); // Assuming 'images' is a JSON string
    } catch (error) {
      console.error("Error parsing images:", error);
    }
  }

  return (
    <>
      <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
        <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-auto">
          <div className="flex justify-between">
            <h3 className="font-bold">Show Product</h3>
            <div
              onClick={onClose}
              className="font-bold text-[26px] cursor-pointer hover:shadow-2xl"
            >
              <AiOutlineCloseCircle />
            </div>
          </div>

          {singleProduct ? (
            <div>
              {/* Render the images */}
              <div className="flex gap-2 flex-wrap">
                {Array.isArray(imageArray) &&
                  imageArray.map((img, index) => (
                    <img
                      key={index}
                      src={img.replace(/\\/g, "")}
                      alt={`Product Image ${index}`}
                      className="w-32 h-32 object-cover rounded"
                    />
                  ))}
              </div>
              <h4>Product Name: {name}</h4>
              <p>Price: {price}</p>
              <p>Selling Price: {sellingPrice}</p>
              <p>Category: {category}</p>
              <p>Description: {description}</p>
            </div>
          ) : (
            <p>Product not found or loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleDetails;
