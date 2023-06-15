import React, { useEffect, useState } from "react";
import EditAccountForm from "./editAccountForm";
import EventManager from "../events/EventManager";
import MyTickets from "../sales/MyTickets";
import { useDispatch, useSelector } from "react-redux";
import BecomeEventManager from "./BecomeEventManger";
import { Link } from "react-router-dom";
import { setEvent } from "../redux/slices/eventSlice";

const MyProfile = () => {
    const [settingsClicked, setSettingsClicked] = useState(false);
    const [ticketsClicked, setTicketsClicked] = useState(true);
    const [manageEventClicked, setManageEventClicked] = useState(false);
    const [myEvents, setMyEvents] = useState([]);
    const accountData = useSelector(
        (state) => state.rootReducer?.accountInfo.account || null
    );
    const token = accountData?.token;

    const dispatchEvent = useDispatch();
    const profileImage = accountData?.avatar_img || null;
    const isEventManager = accountData?.event_manager || null;

    useEffect(() => {
        const fetchSalesAndEventsData = async () => {
            const response = await fetch(
                `${process.env.REACT_APP_API_HOST}/api/accounts/${accountData.id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (response) {
                const data = await response.json();
                setMyEvents(data);
            } else {
                console.error(response);
            }
        };
        fetchSalesAndEventsData();
    }, [accountData, token]);

    return (
        <div className="flex flex-wrap justify-center">
            <div className="w-6/12 sm:w-4/12 px-4">
                <h1
                    style={{ marginBottom: "10px" }}
                    className="text-3xl text-center"
                >
                    My Profile
                </h1>
                <div className="flex justify-center">
                    <img
                        src={profileImage}
                        alt="profilepicture"
                        className="h-auto max-w-full rounded-full"
                        style={{ maxWidth: "100%", maxHeight: "300px" }}
                    />
                </div>
                <h1
                    style={{ marginTop: "10px" }}
                    className="text-3xl text-center"
                >
                    Hello, {accountData?.username}
                </h1>
            </div>
            <div className="w-6/12 sm:w-8/12 mx-auto mt-10 px-4">
                <h2 className="text-xl text-center">Next Event</h2>
                <div className="flex flex-col bg-blue-200 rounded-xl w-96 h-60 mx-auto ease-in-out duration-500 m-3 hover:scale-110">
                    <div>
                        {myEvents &&
                            (myEvents.length === 0 ||
                            !myEvents.sales ||
                            myEvents.sales.length === 0 ? (
                                <>
                                    <p className="text-center">
                                        You do not have any events yet
                                    </p>
                                    <Link
                                        className="bg-transparent ease-in-out duration-500 hover:bg-orange-500 text-orange-500 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded flex justify-center"
                                        type="button"
                                        to="/events/list"
                                    >
                                        Checkout our Events Here!
                                    </Link>
                                </>
                            ) : (
                                myEvents.sales.slice(0, 1).map((event) => (
                                    <Link
                                        to={`/events/detail/`}
                                        key={event.event_id}
                                        onClick={() =>
                                            dispatchEvent(setEvent(event))
                                        }
                                        className="relative inline-block"
                                    >
                                        <img
                                            className="object-fill rounded-t-xl w-96 h-41"
                                            src={event.event_image}
                                            alt={event.event_name}
                                        />
                                        <h5 className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 text-xl font-semibold text-white">
                                            {event.event_name}
                                        </h5>
                                    </Link>
                                ))
                            ))}
                    </div>
                </div>
            </div>
            <div className="w-6/12 sm:w-4/12 m-0-auto m-w-sm m-h-sm">
                <div
                    className="flex flex-col items-start bg-blue-200 p-4 rounded-lg "
                    style={{ maxWidth: "100%", maxHeight: "300px" }}
                >
                    <button
                        href=""
                        className="w-full bg-transparent ease-in-out duration-500 hover:bg-orange-500 text-orange-500 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded my-3"
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
                        className="w-full bg-transparent ease-in-out duration-500 hover:bg-orange-500 text-orange-500 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded my-3"
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
                            className="w-full bg-transparent ease-in-out duration-500 hover:bg-orange-500 text-orange-500 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded my-3"
                            onClick={(e) => {
                                setManageEventClicked(
                                    (prevValue) => !prevValue
                                );
                                setSettingsClicked(false);
                                setTicketsClicked(false);
                            }}
                        >
                            Manage Event
                        </button>
                    ) : (
                        <div className="w-full">
                            <BecomeEventManager />
                        </div>
                    )}
                </div>
            </div>
            <div className="w-6/12 sm:w-8/12 m-0-auto">
                {settingsClicked ? <EditAccountForm /> : null}
                {manageEventClicked ? (
                    <EventManager myEvents={myEvents} />
                ) : null}
                {ticketsClicked ? <MyTickets myEvents={myEvents} /> : null}
            </div>
        </div>
    );
};

export default MyProfile;
