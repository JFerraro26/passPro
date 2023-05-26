import React from "react";
import { useDispatch } from "react-redux";
import { persistStore } from "redux-persist";
import { store } from "../store/store";
import { useGetTokenQuery, useLogoutMutation } from "../store/accountsApi";
import { resetStore } from "../store/store";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const { data } = useGetTokenQuery(store);
  console.log("Logout token", data);

  const handleLogout = async () => {
    try {
      await logout();
      store.dispatch(resetStore());
      dispatch(resetStore());
      localStorage.removeItem("accessToken");
    } catch (error) {
      console.error("logout error:", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
