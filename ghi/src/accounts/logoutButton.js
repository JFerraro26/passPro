import React from "react";
import { useLogoutMutation } from "../redux/apis/accountsApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAccountInfo } from "../redux/slices/accountSlice";

const LogoutButton = ({ handleOpen }) => {
    const [logout] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        try {
            dispatch(setAccountInfo(null));
            dispatch(logout());
        } catch (error) {
            navigate("/");
        }
    };

    return (
        <button
            className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white hover:rounded-lg w-full"
            onClick={() => {
                handleLogout();
                handleOpen();
            }}
        >
            Logout
        </button>
    );
};

export default LogoutButton;
