import { useState, useEffect } from "react";
import { useGetTokenQuery, useLoginMutation } from "../redux/store/accountsApi";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAccountInfo } from "../redux/slices/accountSlice";

const LoginForm = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accountUsername, setAccountUsername] = useState(null);
  const dispatchAccount = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ username, password });
      if (data) {
        setAccountUsername(username);
      } else if (!data) {
        console.error("Error logging In");
      }
    } catch (error) {
      console.error("Login error:", error);
    }

    setUsername("");
    setPassword("");
    e.target.reset();
  };

  useEffect(() => {
    async function fetchAccountData() {
      if (accountUsername === null) {
        return;
      }
      const response = await fetch(
        `${process.env.REACT_APP_API_HOST}/api/account/${accountUsername}`
      );
      if (response.ok) {
        const accountData = await response.json();
        dispatchAccount(setAccountInfo(accountData));
        navigate("/");
      } else {
        console.error(response);
      }
    }
    fetchAccountData();
  }, [accountUsername]);

  return (
    <div className="container mx-auto">
      <h5 className="flex justify-center">Login</h5>
      <div className="flex justify-center">
        <form className="grid-cols-2" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-semibold text-gray-500">
              Username:
            </label>
            <input
              name="username"
              type="text"
              className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-semibold text-gray-500">
              Password:
            </label>
            <input
              name="password"
              type="password"
              className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
