import { NavLink } from "react-router-dom";
import EventDropdown from "./EventDropdown";
import LogoutButton from "../accounts/logoutButton";
import { useGetTokenQuery } from "../store/accountsApi";
import { useSelector } from "react-redux";
import store from "../store/store";

function Nav() {

  return (
    <nav>
      <div className="navbar flex items-center w-full h-16 px-2 gap-4">
        <NavLink className="text-2xl font-semibold hover:text-red-500" to="/">
          Home
        </NavLink>
        <EventDropdown />
        <NavLink
          className="text-2xl font-semibold hover:text-red-500"
          to="/sales/my-tickets"
        >
          My Tickets
        </NavLink>
        <div className="flex md:flex md:flex-grow flex-row justify-end space-x-4">
          <NavLink
            className="text-2xl font-semibold hover:text-red-500"
            to="/sales/cart"
          >
            Cart
          </NavLink>
          <NavLink
            className="text-2xl font-semibold hover:text-red-500"
            to="/login"
          >
            Login
          </NavLink>
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
}

export default Nav;
