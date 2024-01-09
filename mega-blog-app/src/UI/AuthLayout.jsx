import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Loader } from "./";
export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    } else {
      setLoader(false);
    }
  }, [authStatus, navigate, authentication]);
  return loader ? <Loader /> : children;
}
/*
  The `Protected` component is designed to protect routes based on authentication status using React and Redux.
  
  Parameters:
  - `children`: The content to be rendered if authentication is successful.
  - `authentication`: A boolean flag indicating whether authentication is required (default: true).
  
  It utilizes React features such as `useEffect`, `useState`, and hooks like `useSelector` from "react-redux" for managing the component's behavior.

  Inside the component:
  - `navigate`: A function from "react-router-dom" for navigating to different routes.
  - `loader`: State variable to control the rendering of a loading indicator.
  - `authStatus`: Extracted from the Redux store using `useSelector`, representing the current authentication status.

  The `useEffect` hook:
  - Redirects to "/login" if authentication is required and the user is not authenticated.
  - Redirects to "/" if authentication is not required and the user is authenticated.
  - Sets the `loader` state to `false` once the authentication checks are complete.

  The component returns either a `Loader` component while authentication status is being verified, or the `children` content if authentication is successful.

  Example Usage:
