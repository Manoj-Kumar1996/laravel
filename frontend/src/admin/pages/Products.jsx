import React, { useState } from "react";
import UploadProducts from "../component/UploadProducts";
import ShowProducts from "../component/ShowProducts";

const Products = () => {
  const [popup, showPopup] = useState(false);
  const [productsUpdated, setProductsUpdated] = useState(false);

  // This function will be passed to UploadProducts to trigger a refresh of ShowProducts
  const handleProductUploadSuccess = () => {
    setProductsUpdated((prevState) => !prevState); // Toggle state to refresh ShowProducts
    showPopup(false); // Close the popup after a successful upload
  };

  return (
    <>
      <div className="flex justify-between bg-orange-200 items-center px-5 py-3 rounded">
        <div className="font-bold">All Products</div>
        <div>
          <button
            onClick={() => showPopup(true)}
            className="border-black border-[1px] py-2 px-3 rounded-md shadow-2xl hover:bg-orange-400 hover:text-white"
          >
            Add Products
          </button>
        </div>
      </div>

      {/* Pass the productsUpdated state to force ShowProducts to re-render */}
      <ShowProducts key={productsUpdated} />

      {/* Conditionally render the popup and pass the callback */}
      {popup && <UploadProducts onClose={() => showPopup(false)} onUploadSuccess={handleProductUploadSuccess} />}
    </>
  );
};

export default Products;
