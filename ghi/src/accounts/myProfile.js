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
    const [myEvents, setMyEvents] = useState([]);
    const accountData = useSelector(
        (state) => state.rootReducer?.accountInfo.account || null
    );
    const profileImage = accountData?.avatar_img || null;
    const isEventManager = accountData?.event_manager || null;

    console.log("events_list", myEvents);

    useEffect(() => {
        const fetchSaleData = async () => {
            const salesResponse = await fetch(
                `${process.env.REACT_APP_API_HOST}/api/sales`
            );
            const eventResponse = await fetch(
                `${process.env.REACT_APP_API_HOST}/api/events`
            );
            if (salesResponse && eventResponse) {
                const salesData = await salesResponse.json();
                const eventData = await eventResponse.json();
                const boughtTickets = salesData.filter(
                    (event) => event.sold_to === accountData?.id
                );
                const boughtTicketsEvents = boughtTickets.map(
                    (ticket) => ticket.event
                );
                const nextEvent = eventData.filter((event) =>
                    boughtTicketsEvents.includes(event.id)
                );
                console.log(nextEvent);
                setMyEvents(nextEvent);
            } else {
                console.error(salesResponse || eventResponse);
            }
        };
        fetchSaleData();
    }, [accountData]);

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
                <h1
                    style={{ marginTop: "10px" }}
                    className="text-3xl text-center"
                >
                    Hello {accountData?.username}
                </h1>
            </div>
            <div className="w-6/12 sm:w-8/12 mx-auto mt-10 px-4">
                <h2 className="text-xl">Next Event</h2>
                <div className="flex flex-col items-start bg-gray-200 p-4 rounded-lg">
                    {myEvents.length === 0 ? (
                        <p>No events yet</p>
                    ) : (
                        myEvents.slice(0, 1).map((event) => (
                            <div key={event.id}>
                                <img
                                    className="object-cover w-full h-full"
                                    src={event.event_image}
                                    alt={event.event_name}
                                />
                                <p>{event.event_name}</p>
                            </div>
                        ))
                    )}
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
                        <BecomeEventManager />
                    )}
                </div>
            </div>
            <div className="w-6/12 sm:w-8/12 m-0-auto">
                {settingsClicked ? <EditAccountForm /> : null}
                {manageEventClicked ? <EventManager /> : null}
                {ticketsClicked ? <MyTickets myEvents={myEvents} /> : null}
            </div>
        </div>
    );
};

export default MyProfile;
