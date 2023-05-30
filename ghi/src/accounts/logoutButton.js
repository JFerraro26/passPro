import React, { useEffect } from "react";
import { useGetTokenQuery, useLogoutMutation } from "../store/accountsApi";
import { useDispatch } from "react-redux";
import { clearStore } from "../store/clearStore";
import store from "../store/store";
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
