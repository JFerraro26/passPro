import React, { useState } from "react";
import { useGetTokenQuery, useUpdateMutation } from "../store/accountsApi";

const EditAccountForm = ({ accountId }) => {
  const {
    data: accountData,
    isLoading,
    error,
  } = useGetTokenQuery({ accountId });
  const [edit, result] = useUpdateMutation();
  console.log(accountData);

  const [username, setUsername] = useState(accountData?.account.username || "");
  const [avatarImg, setAvatarImg] = useState(
    accountData?.account.avatar_img || ""
  );
  const [email, setEmail] = useState(accountData?.account.email || "");
  const [eventManager, setEventManager] = useState(
    accountData?.account.event_manager || false
  );

  const handleUpdateAccount = async () => {
    const updatedAccount = {
      username,
      avatar_img: avatarImg,
      email,
      event_manager: eventManager,
    };

    await edit({ arg: { accountId: accountId }, updatedAccount });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred while fetching account data</div>;
  }

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="url"
        value={avatarImg}
        onChange={(e) => setAvatarImg(e.target.value)}
        placeholder="Avatar"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <label>
        Event Manager:
        <input
          type="checkbox"
          checked={eventManager}
          onChange={(e) => setEventManager(e.target.checked)}
        />
      </label>
      <button onClick={handleUpdateAccount}>Update Account</button>
    </div>
  );
};

export default EditAccountForm;
