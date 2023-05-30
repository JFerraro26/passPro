import React, { useEffect } from "react";
import {
  useGetTokenQuery,
  useLogoutMutation,
} from "../redux/store/accountsApi";
import { useDispatch } from "react-redux";
import { clearStore } from "../redux/store/clearStore";
import { Navigate, useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      // dispatch(clearStore());
      navigate("/accounts/login");
    } catch (error) {
      console.log("error", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
