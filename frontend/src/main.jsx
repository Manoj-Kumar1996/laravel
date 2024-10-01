import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes";
import { Toaster } from "react-hot-toast";
import Header from "./component/Header";

import { Provider, useDispatch, useSelector } from "react-redux";
import Context from "./context";
import axios from "axios";
import { setUserDetails } from "./store/userSlice";
import store from "./store";

// App component
const App = () => {
  const dispatch = useDispatch();

  const fetchUserDetails = async () => {
    const token = sessionStorage.getItem('token');
    
    try {
      const response = await axios.get("http://localhost:8000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response);
      dispatch(setUserDetails(response.data)); // Dispatch user details to the store
    } catch (error) {
      console.error("Error fetching user details", error);
    }
  };

  useEffect(() => {
    const token =sessionStorage.getItem('token');
    if(token){
      fetchUserDetails();
    }
  }, []); // Empty dependency array to run the effect once on mount
 
  return (
    <>
      <Toaster />
      <Context.Provider value={{ fetchUserDetails }}>
        <Header />
        <RouterProvider router={router} />
      </Context.Provider>
    </>
  );
};

// Wrap the App component with Provider outside
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}> {/* Provider wrapping App */}
      <App /> {/* Use the App component */}
    </Provider>
  </StrictMode>
);
