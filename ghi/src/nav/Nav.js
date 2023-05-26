import { NavLink } from "react-router-dom";
import EventDropdown from "./EventDropdown";

function Nav() {
  return (
    <nav>
      <div className="navbar flex items-center w-full h-16 px-2 gap-4">
        <NavLink className="text-2xl font-semibold hover:text-red-500" to="/">
          Home
        </NavLink>
        <EventDropdown />
        <div className="flex md:flex md:flex-grow flex-row justify-end space-x-1">
          <NavLink
            className="text-2xl font-semibold hover:text-red-500"
            to="/accounts/login"
          >
            Login
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
