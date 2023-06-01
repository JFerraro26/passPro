import {
    useSignUpMutation,
    useLoginMutation,
} from "../redux/store/accountsApi";
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
    const [error, setError] = useState("");

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
                setError(result.error);
            }
        }
    }, [result, login, navigate, username, password]);

    return (
        <div className="container mx-auto">
            <h5 className="flex justify-center">Sign Up</h5>
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
                            type="email"
                            className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {/* <div className="flex justify-start">
            <label className="text-sm font-semibold text-gray-500">
              Event Manager?
            </label>
          </div> */}
                    {/* <div className="flex justify-end">
            <input
              name="eventmanager"
              type="checkbox"
              className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 box-border hover:box-content"
              value={true}
              onChange={(e) => setEventManager(e.target.value)}
            />
          </div> */}
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
