import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdOutlineShoppingBag } from "react-icons/md";
const Aside = () => {
  return (
    <>
      <aside>
        <div className="w-60 bg-blue-900 h-[100vh] fixed">
          <div className="pt-5 px-5">
            <div className="text-white py-2 hover:bg-orange-400 px-3 rounded hover:transition">
              <Link className="flex items-center gap-3" to="/admin">
                <div className="text-[26px]">
                  <AiOutlineDashboard />
                </div>{" "}
                Dashboard
              </Link>
            </div>
            <div className="mt-3 text-white py-2 hover:bg-orange-400 px-3 rounded hover:transition">
              <Link className="flex items-center gap-3" to="/admin/products">
                <div className="text-[26px]">
                  <MdOutlineShoppingBag />
                </div>{" "}
                Products
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Aside;
