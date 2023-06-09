import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setEvent } from "../redux/slices/eventSlice";
import dayjs from "dayjs";

function EventsList() {
    const [state, setState] = useState(useLocation().state);
    const [events, setEvents] = useState([]);
    const dispatch = useDispatch();
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [eventType, setEventType] = useState(false);
    const [stateButton, setStateButton] = useState(false);
    const [states, setStates] = useState([]);
    const [cityButton, setCityButton] = useState(false);
    const [cities, setCities] = useState([]);
    const [venueButton, setVenueButton] = useState(false);
    const [venues, setVenues] = useState([]);

    useEffect(() => {
        const fetchEventData = async () => {
            const url = `${process.env.REACT_APP_API_HOST}/api/events`;
            const response = await fetch(url);
            if (response.ok) {
                if (state === null) {
                    const data = await response.json();
                    setEvents(data);
                    setFilteredEvents(data);
                } else {
                    const data = await response.json();
                    setEvents(data);
                    setFilteredEvents(
                        data.filter((event) => state.includes(event.event_type))
                    );
                    setEventType(true);
                }
            } else {
                console.error(response);
            }
        };
        fetchEventData();
    }, [state]);

    useEffect(() => {
        setStates(
            Array.from(new Set(filteredEvents.map((event) => event.state_id)))
        );
        setCities(
            Array.from(new Set(filteredEvents.map((event) => event.city)))
        );
        setVenues(
            Array.from(new Set(filteredEvents.map((event) => event.venue)))
        );
    }, [filteredEvents]);

    const handleEventSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        let selectedEventTypes = Array.from(formData.getAll("eventType"));
        if (selectedEventTypes.length === 0) {
            return;
        }
        setFilteredEvents(
            filteredEvents.filter((event) =>
                selectedEventTypes.includes(event.event_type)
            )
        );
    };

    const handleStateSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        let selectedStateTypes = Array.from(formData.getAll("stateType"));
        if (selectedStateTypes.length === 0) {
            return;
        }
        setFilteredEvents(
            filteredEvents.filter((event) =>
                selectedStateTypes.includes(event.state_id)
            )
        );
    };

    const handleCitySubmit = (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        let selectedCityTypes = Array.from(formData.getAll("cityType"));
        if (selectedCityTypes.length === 0) {
            return;
        }
        setFilteredEvents(
            filteredEvents.filter((event) =>
                selectedCityTypes.includes(event.city)
            )
        );
    };

    const handleVenueSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        let selectedVenueTypes = Array.from(formData.getAll("venueType"));
        if (selectedVenueTypes.length === 0) {
            return;
        }
        setFilteredEvents(
            filteredEvents.filter((event) =>
                selectedVenueTypes.includes(event.venue)
            )
        );
    };

    const resetFilter = () => {
        setFilteredEvents(events);
        setEventType(false);
        setStateButton(false);
        setCityButton(false);
        setVenueButton(false);
        setState(null);
    };

    return (
        <div className="grid grid-cols-5">
            <div className="rounded-xl mt-4 mx-2 border-2 bg-orange-100 border-blue-500 h-full flex flex-col col-start-1 col-span-1">
                <p className="text-center">Filter Events</p>
                <button onClick={resetFilter}>Reset Filter</button>
                <div className="flex flex-col justify-start content-start">
                    <button onClick={() => setEventType(true)}>
                        <p>Event Type </p>
                    </button>
                    {eventType ? (
                        <form
                            onSubmit={handleEventSubmit}
                            className="flex flex-col ml-4"
                        >
                            <div className="flex gap-x-2">
                                <label htmlFor="sports-checkbox">Sports</label>
                                <input
                                    type="checkbox"
                                    name="eventType"
                                    id="sports-checkbox"
                                    value="sport"
                                    defaultChecked={
                                        state !== null &&
                                        filteredEvents.some(
                                            (event) =>
                                                event.event_type === "sport"
                                        )
                                    }
                                />
                            </div>
                            <div className="flex gap-x-2">
                                <label htmlFor="theater-checkbox">
                                    Theater
                                </label>
                                <input
                                    type="checkbox"
                                    name="eventType"
                                    id="theater-checkbox"
                                    value="theater"
                                    defaultChecked={
                                        state !== null &&
                                        filteredEvents.some(
                                            (event) =>
                                                event.event_type === "theater"
                                        )
                                    }
                                />
                            </div>
                            <div className="flex gap-x-2">
                                <label htmlFor="concert-checkbox">
                                    Concert
                                </label>
                                <input
                                    type="checkbox"
                                    name="eventType"
                                    id="concert-checkbox"
                                    value="concert"
                                    defaultChecked={
                                        state !== null &&
                                        filteredEvents.some(
                                            (event) =>
                                                event.event_type === "concert"
                                        )
                                    }
                                />
                            </div>
                            <button className="border w-1/3 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full">
                                Submit
                            </button>
                        </form>
                    ) : null}
                    <button onClick={() => setStateButton(true)}>
                        States({states.length})
                    </button>
                    {stateButton ? (
                        <form onSubmit={handleStateSubmit}>
                            {states?.map((state) => {
                                return (
                                    <div key={state} className="flex gap-x-2">
                                        <label htmlFor={state}>{state}</label>
                                        <input
                                            value={state}
                                            type="checkbox"
                                            name="stateType"
                                            id={state}
                                        />
                                    </div>
                                );
                            })}
                            <button className="border w-1/3 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full">
                                Submit
                            </button>
                        </form>
                    ) : null}
                    <button onClick={() => setCityButton(true)}>
                        Cities({cities.length})
                    </button>
                    {cityButton ? (
                        <form onSubmit={handleCitySubmit}>
                            {cities?.map((city) => {
                                return (
                                    <div key={city} className="flex gap-x-2">
                                        <label htmlFor={city}>{city}</label>
                                        <input
                                            value={city}
                                            type="checkbox"
                                            name="cityType"
                                            id={city}
                                        />
                                    </div>
                                );
                            })}
                            <button className="border w-1/3 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full">
                                Submit
                            </button>
                        </form>
                    ) : null}
                    <button onClick={() => setVenueButton(true)}>
                        Venues({venues.length})
                    </button>
                    {venueButton ? (
                        <form onSubmit={handleVenueSubmit}>
                            {venues?.map((venue) => {
                                return (
                                    <div key={venue} className="flex gap-x-2">
                                        <label htmlFor={venue}>{venue}</label>
                                        <input
                                            value={venue}
                                            type="checkbox"
                                            name="venueType"
                                            id={venue}
                                        />
                                    </div>
                                );
                            })}
                            <button className="border w-1/3 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full">
                                Submit
                            </button>
                        </form>
                    ) : null}
                </div>
            </div>
            <div className="flex flex-col col-start-2 col-span-4">
                <h1 className="text-center">Events</h1>
                <table className="min-w-full text-center text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                            <th
                                scope="col"
                                className=" px-6 py-4 dark:border-neutral-500"
                            >
                                Date
                            </th>
                            <th
                                scope="col"
                                className=" px-6 py-4 dark:border-neutral-500"
                            >
                                Event
                            </th>
                            <th
                                scope="col"
                                className=" px-6 py-4 dark:border-neutral-500"
                            >
                                Venue
                            </th>
                            <th
                                scope="col"
                                className=" px-6 py-4 dark:border-neutral-500"
                            >
                                City
                            </th>
                            <th
                                scope="col"
                                className=" px-6 py-4 dark:border-neutral-500"
                            >
                                State
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEvents?.map((event) => {
                            return (
                                <tr
                                    key={event.id}
                                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                                >
                                    <td className="whitespace-nowrap px-6 py-4">
                                        {dayjs(event.date).format("MM/DD/YYYY")}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        {event.event_name}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        {event.venue}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        {event.city}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        {event.state_id}
                                    </td>
                                    <td>
                                        <Link
                                            onClick={() =>
                                                dispatch(setEvent(event))
                                            }
                                            to="/events/detail"
                                            className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                            type="button"
                                        >
                                            Details
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EventsList;
