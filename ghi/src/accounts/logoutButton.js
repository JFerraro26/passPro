import React, { useEffect } from "react";
import { useLogoutMutation } from "../redux/store/accountsApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      dispatch(logout());
      navigate("/accounts/login");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <button
      className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white hover:rounded-lg"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
