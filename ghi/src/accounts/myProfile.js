import React from "react";
import { useGetTokenQuery } from "../redux/store/accountsApi";

const MyProfile = () => {
  const accountData = useGetTokenQuery();
  let profileImage = accountData.currentData?.account.avatar_img;

  if (accountData.isLoading) {
    return <div>Loading...</div>;
  } else if (accountData.isError) {
    return <div>You must be logged in to view this page</div>;
  }

  return (
    <>
      <div className="flex flex-wrap justify-start">
        <div className="w-6/12 sm:w-4/12 px-4">
          <h1 style={{ marginBottom: "10px" }} className="text-3xl">
            My Profile
          </h1>
          <img
            src={profileImage}
            alt="profilepicture"
            className="shadow-lg rounded-full max-w-full h-auto align-middle border-none"
          />
          <h1 style={{ marginTop: "10px" }} className="text-3xl text-center">
            Hello {accountData.currentData.account.username}
          </h1>
        </div>
        <div className="w-6/12 sm:w-4/12 px-4">
          <div className="flex flex-col items-start bg-gray-200 p-4 rounded-lg">
            <h2 className="text-xl">Next Event</h2>
            {/* Place the content of your "Next Event" box here */}
          </div>
        </div>
      </div>
      <div
        style={{ marginTop: "50px" }}
        className="container mx-left
      "
      >
        <div className="w-6/12 sm:w-4/12 m0-auto">
          <div className="flex flex-col items-start bg-gray-200 p-4 rounded-lg">
            <a
              href="/my-tickets"
              className="m-2 p-2 bg-white rounded-lg w-full"
            >
              My Tickets
            </a>
            <a
              href="/my-settings"
              className="m-2 p-2 bg-white rounded-lg w-full"
            >
              My Settings
            </a>
            <a
              href="/manage-event"
              className="m-2 p-2 bg-white rounded-lg w-full"
            >
              Manage Event
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
