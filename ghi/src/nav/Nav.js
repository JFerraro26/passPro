import { NavLink } from "react-router-dom";
import EventDropdown from "./EventDropdown";
import { useState, useEffect } from "react";
import NavBarSearch from "./NavBarSearch";
import { useSelector } from "react-redux";
import ProfileDropdown from "./ProfileDropdown";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import LogInPopUP from "./LoginPopUp";

function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const accountData = useSelector(
    (store) => store.rootReducer.accountInfo.account
  );
  const cartData = useSelector(
    (store) => store.rootReducer.cart.globalCartList
  );

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
        <Link className="text-2xl font-semibold hover:text-red-500" to="/">
          <img
            src={process.env.PUBLIC_URL + `/passpro.png`}
            alt="passpro"
            className="bg-blend-color-dodge h-20 w-25 mr-2"
          />
        </Link>
        <EventDropdown />
        <NavBarSearch />
        <div className="flex md:flex md:flex-grow flex-row justify-end space-x-4">
          {cartData < 1 ? (
            <NavLink
              className="text-2xl font-semibold hover:text-red-500"
              to="/sales/cart"
            >
              <AiOutlineShoppingCart />
            </NavLink>
          ) : (
            <NavLink
              className="flex text-2xl font-semibold hover:text-red-500"
              to="/sales/cart"
            >
              <p className="mt-1">
                <AiOutlineShoppingCart />
              </p>
              <p>
                <span>(</span>
                <span className="text-red-500">{cartData.length}</span>
                <span>)</span>
              </p>
            </NavLink>
          )}

          {isLoggedIn ? <ProfileDropdown /> : <LogInPopUP />}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
