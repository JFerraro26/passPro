import { NavLink } from "react-router-dom";
import EventDropdown from "./EventDropdown";
import LogoutButton from "../accounts/logoutButton";
import { useGetTokenQuery } from "../store/accountsApi";
import { useState } from "react";
import { useEffect } from "react";
import NavBarSearch from "./NavBarSearch";

function Nav() {
  const getTokenQuery = useGetTokenQuery();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (getTokenQuery.isSuccess) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      // Look more into this, catching 401 unauthorized error
      console.clear();
      console.log("You are not logged in");
    }
  }, [getTokenQuery]);

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
        <NavBarSearch />
        <div className="flex md:flex md:flex-grow flex-row justify-end space-x-4">
          <NavLink
            className="text-2xl font-semibold hover:text-red-500"
            to="/sales/cart"
          >
            Cart
          </NavLink>
          <NavLink
            className="text-2xl font-semibold hover:text-red-500"
            to="/sales/cart"
          >
            Cart
          </NavLink>
          {isLoggedIn ? (
            <LogoutButton />
          ) : (
            <NavLink
              className="text-2xl font-semibold hover:text-red-500"
              to="/login"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
