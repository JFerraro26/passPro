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
                            src={process.env.PUBLIC_URL + `/photos/passpro.png`}
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
                <div className="gap-x-6 flex flex-row justify-center items-center col-start-7 col-span-1">
                    {cartData < 1 ? (
                        <NavLink
                            className="text-2xl font-semibold hover:text-orange-500"
                            to="/sales/cart"
                        >
                            <AiOutlineShoppingCart />
                        </NavLink>
                    ) : (
                        <NavLink
                            className="flex items-center hover:text-orange-500"
                            to="/sales/cart"
                        >
                            <div className="relative">
                                <AiOutlineShoppingCart className="text-2xl" />
                                {totalTickets > 0 && (
                                    <div className="absolute bottom-[-15px] right-[-15px]">
                                        <div className="bg-orange-500 rounded-full w-6 h-6 flex items-center justify-center">
                                            <p className="text-black text-xs">
                                                {totalTickets}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </NavLink>
                    )}
                    {isLoggedIn ? <ProfileDropdown /> : <LogInPopUP />}
                </div>
            </div>
        </nav>
    );
}

export default Nav;
