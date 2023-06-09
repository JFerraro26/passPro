import { useSignUpMutation, useLoginMutation } from "../redux/apis/accountsApi";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAccountInfo } from "../redux/slices/accountSlice";

const SignUpForm = ({ setOpen }) => {
    const [signUp] = useSignUpMutation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [login] = useLoginMutation();
    const [avatarImg, setAvatarImg] = useState(
        "https://cdn.vox-cdn.com/thumbor/nCVu8PPQ1lSUhv8uCGcmsJbf0-A=/1400x1050/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/9140061/Screen_Shot_2017_08_29_at_4.27.44_PM.png"
    );
    const [email, setEmail] = useState("");
    const [invalidCredentials, setInvalidCredentials] = useState(false);
    const dispatch = useDispatch();
    const [token, setToken] = useState(null);
    const [accountUsername, setAccountUsername] = useState(null);
    const [invalidInfo, setInvalidInfo] = useState(false);

    const userData = {
        username,
        password,
        avatar_img: avatarImg,
        email,
        event_manager: false,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const signUpResponse = await signUp(userData);
            if (!signUpResponse.error) {
                const { data } = await login({ username, password });
                if (data) {
                    setToken(data.access_token);
                    setAccountUsername(username);
                }
            } else {
                setInvalidInfo(true);
            }
        } catch (error) {
            setInvalidInfo(true);
            console.error("Login error:", error);
        }
    };

    useEffect(() => {
        async function fetchAccountData() {
            if (accountUsername === null) {
                return;
            }
            const response = await fetch(
                `${process.env.REACT_APP_API_HOST}/api/account/${accountUsername}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (response.ok) {
                const accountData = await response.json();
                accountData.token = token;
                dispatch(setAccountInfo(accountData));
                setOpen(false);
            } else {
                console.error(response);
            }
        }
        fetchAccountData();
    }, [accountUsername, dispatch, token, setOpen]);

    return (
        <div className="container mx-auto">
            <h5 className="flex justify-center">Sign Up</h5>
            <div className="flex justify-center">
                <form className="grid-cols-2" onSubmit={(e) => handleSubmit(e)}>
                    <div className="flex flex-col space-y-1">
                        {invalidCredentials ? (
                            <div className="container">
                                <div className="flex items-center justify-center">
                                    <div
                                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                        role="alert"
                                    >
                                        <div className="flex">
                                            <strong className="font-bold">
                                                Username or Email must be unique
                                            </strong>
                                            <span className="ml-auto">
                                                <svg
                                                    className="fillCurrent h-6 w-6 text-red-500"
                                                    role="button"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <title>Close</title>
                                                    <path
                                                        onClick={(e) =>
                                                            setInvalidCredentials(
                                                                false
                                                            )
                                                        }
                                                        d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
                                                    />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                        <label className="text-sm font-semibold text-gray-500 ">
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
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-semibold text-gray-500">
                            Avatar Img
                        </label>
                        <input
                            name="avatarimg"
                            type="url"
                            placeholder="http://fry.jpg"
                            className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                            onChange={(e) => setAvatarImg(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-semibold text-gray-500">
                            Email
                        </label>
                        <input
                            name="email"
                            required
                            type="email"
                            className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                            type="submit"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
            {invalidInfo ? (
                <div
                    className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                >
                    <svg
                        aria-hidden="true"
                        className="flex-shrink-0 inline w-5 h-5 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                    <span className="sr-only">Danger</span>
                    <div>
                        <span className="font-medium">
                            Ensure that these requirements are met:
                        </span>
                        <ul className="mt-1.5 ml-4 list-disc list-inside">
                            <li>Username and Email Must Be Unique!</li>
                            <li>Email must be a valid email.</li>
                            <li>
                                Avatar Image must be a url but it is optional.
                            </li>
                        </ul>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default SignUpForm;
