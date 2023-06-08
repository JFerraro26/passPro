import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBarSearch from "./NavBarSearch";
import { useSelector } from "react-redux";
import ProfileDropdown from "./ProfileDropdown";
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

  const totalTickets = cartData?.reduce(
    (sum, event) => sum + event.quantity,
    0
  );

  return (
    <nav>
      <div className="grid grid-cols-7 bg-blue-500">
        <div className="mt-1 col-start-1 col-span-1">
          <NavLink className="" to="/">
            <img
              src={process.env.PUBLIC_URL + `/passpro.png`}
              alt="passpro"
              className="h-20 bg-blend-color-dodge object-cover"
            />
          </NavLink>
        </div>
        <div className="flex justify-center items-center col-start-2 col-span-1">
          <NavLink
            className="block text-2xl font-semibold hover:text-orange-500"
            to="/events/list"
          >
            Events List
          </NavLink>
        </div>
        <div className="flex justify-center items-center col-start-3 col-span-3">
          <NavBarSearch />
        </div>
        {accountData?.event_manager ? (
          <div className="flex justify-center items-center col-start-6 col-span-1">
            <NavLink
              className="block text-2xl font-semibold hover:text-orange-500"
              to="/events/form"
              state={null}
            >
              New Event
            </NavLink>
          </div>
        ) : null}
        <div className="gap-x-4 flex flex-row justify-center items-center col-start-7 col-span-1">
          {cartData < 1 ? (
            <NavLink
              className="text-2xl font-semibold hover:text-orange-500"
              to="/sales/cart"
            >
              <AiOutlineShoppingCart />
            </NavLink>
          ) : (
            <NavLink
              className="flex text-2xl font-semibold hover:text-orange-500"
              to="/sales/cart"
            >
              <p className="mt-1">
                <AiOutlineShoppingCart />
              </p>
              <p>
                <span>(</span>
                <span className="text-red-500">{totalTickets}</span>
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
