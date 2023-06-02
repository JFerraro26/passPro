import { useState, useEffect } from "react";
import { useLoginMutation } from "../redux/store/accountsApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAccountInfo } from "../redux/slices/accountSlice";

const LoginForm = () => {
    const navigate = useNavigate();
    const [login] = useLoginMutation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [accountUsername, setAccountUsername] = useState(null);
    const dispatchAccount = useDispatch();
    const [invalidLogin, setInvalidLogin] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await login({ username, password });
            if (data) {
                setAccountUsername(username);
            } else if (!data) {
                setInvalidLogin(true);
            }
        } catch (error) {}

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
    }, [accountUsername, dispatchAccount, navigate]);

    return (
        <div className="container mx-auto">
            <h5 className="flex justify-center">Login</h5>
            {invalidLogin ? (
                <div className="flex items-center justify-center">
                    <div
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                        role="alert"
                    >
                        <div className="flex">
                            <strong className="font-bold">
                                Invalid Credentials!
                            </strong>
                            <span className="ml-auto">
                                <svg
                                    className="fill-current h-6 w-6 text-red-500"
                                    role="button"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <title>Close</title>
                                    <path
                                        onClick={(e) => setInvalidLogin(false)}
                                        d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            ) : null}
            <div className="flex justify-center">
                <form className="grid-cols-2" onSubmit={(e) => handleSubmit(e)}>
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-semibold text-gray-500">
                            Username:
                        </label>
                        <input
                            name="username"
                            required
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
                            required
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
