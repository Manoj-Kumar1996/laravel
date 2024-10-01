import React from "react";
import Aside from "../component/Aside";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Admin = () => {
  return (
    <>
      <div className="flex">
        <Aside />
        <div className="p-5 w-full h-full max-w-[80%] ml-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Admin;
