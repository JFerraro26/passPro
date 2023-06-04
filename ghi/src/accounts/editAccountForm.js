import React, { useEffect, useState } from "react";
import { useUpdateMutation } from "../redux/apis/accountsApi";
import { useDispatch, useSelector } from "react-redux";
import { setAccountInfo } from "../redux/slices/accountSlice";

const EditAccountForm = () => {
    const account = useSelector(
        (state) => state.rootReducer.accountInfo.account
    );
    const [edit] = useUpdateMutation();
    const [username, setUsername] = useState("");
    const [avatarImg, setAvatarImg] = useState("");
    const [email, setEmail] = useState("");
    const [eventManager, setEventManager] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        if (account) {
            setUsername(account.username);
            setAvatarImg(account.avatar_img);
            setEmail(account.email);
            setEventManager(account.event_manager);
        }
    }, [account]);

    const handleUpdateAccount = async (e) => {
        e.preventDefault();
        const updatedAccount = {
            id: account.id,
            username: username,
            avatar_img: avatarImg,
            email: email,
            event_manager: eventManager,
        };

        const response = await edit({ accountId: account.id, updatedAccount });
        if (response) {
            dispatch(setAccountInfo(updatedAccount));
        } else {
            console.error(response);
        }
    };

    return (
        <div className="container mx-auto">
            <h5 className="flex justify-center">Update Account</h5>
            <div className="flex justify-center">
                <form
                    className="grid-cols-2"
                    onSubmit={(e) => handleUpdateAccount(e)}
                >
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-semibold text-gray-500">
                            Username:
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-semibold text-gray-500">
                            Avatar Image:
                        </label>
                        <input
                            type="url"
                            value={avatarImg}
                            onChange={(e) => setAvatarImg(e.target.value)}
                            placeholder="Avatar"
                            className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-semibold text-gray-500">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                        />
                    </div>
                    <div className="flex justify-center">
                        <label>
                            Event Manager:
                            <input
                                type="checkbox"
                                checked={eventManager}
                                onChange={(e) =>
                                    setEventManager(e.target.checked)
                                }
                            />
                        </label>
                    </div>
                    <div className="flex justify-center">
                        <button className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4">
                            Update Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditAccountForm;
