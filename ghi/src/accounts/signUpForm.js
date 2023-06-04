import { useSignUpMutation, useLoginMutation } from "../redux/apis/accountsApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
    const [signUp, result] = useSignUpMutation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [login] = useLoginMutation();
    const navigate = useNavigate();
    const [avatarImg, setAvatarImg] = useState(
        "https://cdn.vox-cdn.com/thumbor/nCVu8PPQ1lSUhv8uCGcmsJbf0-A=/1400x1050/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/9140061/Screen_Shot_2017_08_29_at_4.27.44_PM.png"
    );
    const [email, setEmail] = useState("");
    const [eventManager, setEventManager] = useState(false);
    const [invalidCredentials, setInvalidCredentials] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signUp({
                username,
                password,
                avatar_img: avatarImg,
                email,
                event_manager: eventManager,
            });
        } catch (error) {
            console.error("Login error:", error);
        }

        setUsername("");
        setPassword("");
        setAvatarImg("");
        setEmail("");
        setEventManager(false);
        e.target.reset();
    };
    useEffect(() => {
        if (!result.isLoading) {
            if (result.isSuccess) {
                login({ username, password });
                navigate("/");
            } else if (result.isError) {
                console.log("Invalid Information");
                setInvalidCredentials(true);
            }
        }
    }, [result, login, navigate, username, password]);

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
                                                    className="fill-current h-6 w-6 text-red-500"
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
                            placeholder="fry"
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
        </div>
    );
};

export default SignUpForm;
