import { NavLink } from "react-router-dom";
import EventDropdown from "./EventDropdown";
import { useGetTokenQuery } from "../redux/store/accountsApi";
import { useState, useEffect } from "react";
import NavBarSearch from "./NavBarSearch";
import ProfileDropdown from "./ProfileDropdown";
import { setAccountInfo } from "../redux/slices/accountSlice";
import { useDispatch, useSelector } from "react-redux";

function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const accountData = useSelector(
    (store) => store.rootReducer.accountInfo.account
  );
  console.log(accountData);

  useEffect(() => {
    if (accountData === null) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [accountData]);

  return (
    <nav>
      <div className="navbar bg-blue-500 flex items-center w-full h-16 px-2 gap-4">
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
          {isLoggedIn ? (
            <ProfileDropdown />
          ) : (
            <NavLink
              className="text-2xl font-semibold hover:text-red-500"
              to="/accounts/login"
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
