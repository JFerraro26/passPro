import { NavLink } from "react-router-dom";
import { useState } from "react";
import LogoutButton from "../accounts/logoutButton";
import { useSelector } from "react-redux";

function ProfileDropdown() {
    const account = useSelector(
        (state) => state.rootReducer.accountInfo.account
    );
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(!open);
    };
    return (
        <div className="relative">
            <button
                onClick={handleOpen}
                className="relative block text-2xl font-semibold hover:text-red-500"
                id="my-content-button"
            >
                Hello, {account?.username}
            </button>
            {open ? (
                <button
                    onClick={handleOpen}
                    className="fixed inset-0 h-full w-full cursor-default"
                ></button>
            ) : null}
            {open ? (
                <div className="absolute  top-auto right-0 w-48 mt-2 py-2 bg-white rounded-lg shadow-xl">
                    <NavLink
                        className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white hover:rounded-lg"
                        to="/accounts/profile"
                        onClick={handleOpen}
                    >
                        My Profile
                    </NavLink>
                    <LogoutButton />
                </div>
            ) : null}
        </div>
    );
}

export default ProfileDropdown;
