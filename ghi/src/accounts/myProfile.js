import React, { useEffect } from "react";
import { useState } from "react";
import EditAccountForm from "./editAccountForm";
import EventManager from "../events/EventManager";
import MyTickets from "../sales/MyTickets";
import { useSelector } from "react-redux";
import BecomeEventManager from "./BecomeEventManger";

const MyProfile = () => {
  const [settingsClicked, setSettingsClicked] = useState(false);
  const [ticketsClicked, setTicketsClicked] = useState(false);
  const [manageEventClicked, setManageEventClicked] = useState(false);
  const accountData = useSelector(
    (state) => state.rootReducer?.accountInfo.account || null
  );
  const profileImage = accountData?.avatar_img || null;
  const isEventManager = accountData?.event_manager || null;

  useEffect(() => {}, [accountData]);

  return (
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
          Hello {accountData?.username}
        </h1>
      </div>
      <div className="w-6/12 sm:w-8/12 mx-auto mt-10 px-4">
        <h2 className="text-xl">Next Event</h2>
        <div className="flex flex-col items-start bg-gray-200 p-4 rounded-lg">
          {/* Place the content of your "Next Event" box here */}
          <img
            className="object-cover w-full h-full "
            src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F507930689%2F566172327697%2F1%2Foriginal.20230504-193823?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=46%2C0%2C1284%2C642&s=69b986b336a36fb7fe7b863069441e20"
            alt="yes"
          />
          Casino Night
        </div>
      </div>
      <div className="w-6/12 sm:w-4/12 m-0-auto">
        <div className="flex flex-col items-start bg-gray-200 p-4 rounded-lg">
          <button
            href=""
            className="m-2 p-2 bg-white rounded-lg w-full"
            onClick={(e) => {
              setTicketsClicked((prevValue) => !prevValue);
              setSettingsClicked(false);
              setManageEventClicked(false);
            }}
          >
            My Tickets
          </button>

          <button
            href=""
            className="m-2 p-2 bg-white rounded-lg w-full"
            onClick={(e) => {
              setSettingsClicked((prevValue) => !prevValue);
              setTicketsClicked(false);
              setManageEventClicked(false);
            }}
          >
            My Settings
          </button>
          {isEventManager ? (
            <button
              href=""
              className="m-2 p-2 bg-white rounded-lg w-full"
              onClick={(e) => {
                setManageEventClicked((prevValue) => !prevValue);
                setSettingsClicked(false);
                setTicketsClicked(false);
              }}
            >
              Manage Event
            </button>
          ) : (
            <BecomeEventManager />
          )}
        </div>
      </div>
      <div className="w-6/12 sm:w-8/12 m-0-auto">
        {settingsClicked ? <EditAccountForm /> : null}
        {manageEventClicked ? <EventManager /> : null}
        {ticketsClicked ? <MyTickets /> : null}
      </div>
    </div>
  );
};

export default MyProfile;
