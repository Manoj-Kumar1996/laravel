import React, { useEffect, useState } from "react";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useSelector } from "react-redux";


const Header = ({fetchUserDetails}) => {
  const user = useSelector((state)=>state?.user?.user?.user);
  
  const handleLogout =()=>{
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    location.href='/login'
  }


  return (
    <>
      <header className="sticky top-0 w-full backdrop-sepia-0 bg-white/80">
        <div className="shadow-lg py-1">
          <div className="flex px-[50px] items-center">
            <div className="w-1/4">
              <div className="">
                <div className="">
                  <img
                    className="w-[60px]"
                    src="https://seeklogo.com/images/L/Logon-logo-7D9DD9757F-seeklogo.com.gif"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="w-2/4">
              <div className="flex">
                <input
                  placeholder="Search items.."
                  className="shadow-lg rounded-l-md block w-full border-0 py-2 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inse sm:text-sm sm:leading-6"
                />
                <button
                  style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
                  className="bg-orange-400 text-white px-5 rounded-r-md"
                >
                  SEARCH
                </button>
              </div>
            </div>
            <div className="w-1/4 ">
              <div className="flex justify-end items-center gap-3">
                <div className="">
                  <h3>{user?.name}</h3>
                  <p className="text-[12px]">{user?.email}</p>
                </div>
                <div className="dropdown inline-block relative">
                  <button className=" text-gray-700 font-semibold text-[50px] rounded inline-flex items-center">
                    {
                      user?.image ? (<div className="h-[50px] w-[50px] flex items-center">
                          <img className="h-[100%] object-cover rounded-full" src={user?.image} />
                      </div>) : (<IoPersonCircleSharp />)
                    }
                    
                  </button>
                  <ul className="dropdown-menu absolute hidden text-gray-700 pt-3 w-[150px] -left-20 shadow-2xl">
                    <li className="">
                      <a
                        className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                        href="/admin/profile"
                      >
                        Profile
                      </a>
                    </li>
                    <li className="">
                      <a
                        className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                        href="#"
                      >
                        Setting
                      </a>
                    </li>
                    <li className="" onClick={handleLogout}>
                      <a
                        className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                        href="#"
                      >
                        
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
