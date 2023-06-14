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
    const token = account?.token;

    useEffect(() => {
        if (account) {
            setUsername(account.username);
            setAvatarImg(account.avatar_img);
            setEmail(account.email);
            setEventManager(account.event_manager);
        }
    }, [account]);

    const updatedAccount = {
        id: account.id,
        username: username,
        avatar_img: avatarImg,
        email: email,
        event_manager: eventManager,
    };

    const handleUpdateAccount = async (e) => {
        e.preventDefault();

        const response = await edit({
            accountId: account.id,
            updatedAccount,
            token: token,
        });
        if (response) {
            updatedAccount.token = token;
            dispatch(setAccountInfo(updatedAccount));
        } else {
            console.error(response);
        }
    };

    return (
        <div className="container mx-auto bg-slate-100">
            <h5 className="flex justify-start text-2xl pl-5 pt-10">Settings</h5>
            <h5 className="pl-5">Change your basic account settings here.</h5>
            <div className="flex justify-start">
                <form
                    className="w-5/6 pt-12 pl-5"
                    onSubmit={(e) => handleUpdateAccount(e)}
                >
                    <div className="relative z-0 w-full mb-6 group">
                        <label className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Username:
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer overflow-hidden"
                        />
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <label className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Avatar Image:
                        </label>
                        <input
                            type="url"
                            value={avatarImg}
                            onChange={(e) => setAvatarImg(e.target.value)}
                            placeholder="Avatar"
                            className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer overflow-x-scroll truncate"
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <div className="relative z-0 w-full mb-6 group">
                            <label className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer overflow-hidden"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button className="bg-transparent hover:bg-orange-500 text-orange-500 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded">
                            Update Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditAccountForm;
