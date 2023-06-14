import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import StateList from "../state_list/StateList";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setEvent } from "../redux/slices/eventSlice";

function EventForm() {
    const { state } = useLocation();
    const [typeEvent, setTypeEvent] = useState("");
    const [nameEvent, setNameEvent] = useState("");
    const [imageEvent, setImageEvent] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [description, setDescription] = useState("");
    const [ticketsMax, setTicketsMax] = useState("");
    const [ticketsPrice, setTicketsPrice] = useState("");
    const [venue, setVenue] = useState("");
    const [city, setCity] = useState("");
    const [stateId, setStateId] = useState("");
    const account = useSelector(
        (state) => state.rootReducer.accountInfo.account
    );
    const token = account.token;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (state == null) {
            setTypeEvent("");
            setNameEvent("");
            setImageEvent("");
            setDate("");
            setStartTime("");
            setEndTime("");
            setDescription("");
            setTicketsMax("");
            setTicketsPrice("");
            setVenue("");
            setCity("");
            setStateId("");
        } else {
            setTypeEvent(state.event.event_type);
            setNameEvent(state.event.event_name);
            setImageEvent(state.event.event_image);
            setDate(state.event.date);
            setStartTime(state.event.start_time);
            setEndTime(state.event.end_time);
            setDescription(state.event.description);
            setTicketsMax(state.event.tickets_max);
            setTicketsPrice(state.event.tickets_price);
            setVenue(state.event.venue);
            setCity(state.event.city);
            setStateId(state.event.state_id);
        }
    }, [state]);

    const EventSubmitCreate = async (event) => {
        event.preventDefault();
        const formData = {};
        formData.event_type = typeEvent;
        formData.event_name = nameEvent;
        formData.event_image = imageEvent;
        formData.date = date;
        formData.start_time = startTime;
        formData.end_time = endTime;
        formData.description = description;
        formData.tickets_sold = 0;
        formData.tickets_max = ticketsMax;
        formData.tickets_price = ticketsPrice;
        formData.promoted = false;
        formData.venue = venue;
        formData.city = city;
        formData.state_id = stateId;
        formData.created_by = account.id;
        if (state === null) {
            let eventUrl = `${process.env.REACT_APP_API_HOST}/api/events`;
            let eventFetchConfig = {
                method: "post",
                body: JSON.stringify(formData),
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };
            const response = await fetch(eventUrl, eventFetchConfig);
            if (response.ok) {
                dispatch(setEvent(formData));
                navigate("/events/detail");
            } else {
                console.error(response);
            }
        } else {
            const eventId = state.event.id;
            let eventUrl = `${process.env.REACT_APP_API_HOST}/api/events/${eventId}`;
            let eventFetchConfig = {
                method: "put",
                body: JSON.stringify(formData),
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };
            const response = await fetch(eventUrl, eventFetchConfig);
            if (response.ok) {
                dispatch(setEvent(formData));
                navigate("/events/detail");
            } else {
                console.error(response);
            }
        }
    };
    return (
        <div className="container mx-auto bg-orange-200 shadow-xl rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
            <div className="grid grid-cols-5">
                <div className="flex flex-col col-start-1 col-span-2">
                    <h1 className="text-5xl">New Event Form</h1>
                    <img
                        src={process.env.PUBLIC_URL + `/passpro.png`}
                        alt="passpro"
                        className="h-full bg-blend-color-dodge object-contain"
                    />
                </div>
                <div className="flex flex-col col-start-3 col-span-4 items-center text-blue-500">
                    <form
                        onSubmit={EventSubmitCreate}
                        className="flex flex-col w-full gap-2"
                    >
                        <div className="flex flex-col">
                            <label
                                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2 text-center"
                                htmlFor="event-type"
                            >
                                Event Type
                            </label>
                            <select
                                value={typeEvent}
                                onChange={(e) => setTypeEvent(e.target.value)}
                                className="bg-green-50 border text-black border-green-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                name="event-type"
                                id="event-type"
                                required
                            >
                                <option value="">
                                    Please Choose an event type
                                </option>
                                <option value="sport">Sport</option>
                                <option value="theater">Theater</option>
                                <option value="concert">Concert</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="name"
                                className="block uppercase tracking-wide text-xs font-bold mb-2 text-center"
                            >
                                Event Name
                            </label>
                            <input
                                value={nameEvent}
                                onChange={(e) => setNameEvent(e.target.value)}
                                className="bg-green-50 border border-green-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Event Name..."
                            />
                        </div>
                        <div className="flex flex-col ">
                            <label
                                htmlFor="event-url"
                                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2 text-center"
                            >
                                Picture Url
                            </label>
                            <input
                                value={imageEvent}
                                onChange={(e) => setImageEvent(e.target.value)}
                                className="bg-green-50 border border-green-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                type="text"
                                id="event-url"
                                name="event-url"
                                placeholder="Event Picture Url..."
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2 text-center"
                                htmlFor="date"
                            >
                                Date
                            </label>
                            <input
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="bg-green-50 border border-green-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                type="date"
                                id="date"
                                name="date"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2 text-center"
                                htmlFor="start_time"
                            >
                                Start Time
                            </label>
                            <input
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="bg-green-50 border border-green-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                type="time"
                                id="start_time"
                                name="start_time"
                            ></input>
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="end_time"
                                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2 text-center"
                            >
                                End Time
                            </label>
                            <input
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="bg-green-50 border border-green-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                type="time"
                                id="end_time"
                                name="end_time"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="event-description"
                                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2 text-center"
                            >
                                Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="bg-green-50 border border-green-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 min-h-10"
                                required
                                type="text"
                                name="event-description"
                                placeholder="Description..."
                                rows="7"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2 text-center"
                                htmlFor="tickets-max"
                            >
                                How many tickets do you want to sell?
                            </label>
                            <input
                                value={ticketsMax}
                                onChange={(e) => setTicketsMax(e.target.value)}
                                className="bg-green-50 border border-green-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                type="number"
                                id="tickets-max"
                                name="tickets-max"
                                min="1"
                                placeholder="10"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="tickets-price"
                                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2 text-center"
                            >
                                Ticket Price
                            </label>
                            <input
                                value={ticketsPrice}
                                onChange={(e) =>
                                    setTicketsPrice(e.target.value)
                                }
                                className="bg-green-50 border border-green-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                type="number"
                                id="tickets-price"
                                name="tickets-price"
                                placeholder="19.99"
                                step="0.01"
                                min="0"
                            />
                        </div>
                        <StateList stateId={stateId} setStateId={setStateId} />
                        <div className="flex flex-col">
                            <label
                                htmlFor="city"
                                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2 text-center"
                            >
                                City
                            </label>
                            <input
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="bg-green-50 border border-green-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                type="text"
                                id="city"
                                name="city"
                                placeholder="City..."
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="venue"
                                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2 text-center"
                            >
                                Venue
                            </label>
                            <input
                                value={venue}
                                onChange={(e) => setVenue(e.target.value)}
                                className="bg-green-50 border border-green-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                type="text"
                                id="venue"
                                name="venue"
                                placeholder="Venue..."
                            />
                        </div>
                        <button class="relative inline-flex items-center justify-center h-full px-12 py-3 overflow-hidden text-lg font-medium text-green-500 border-2 border-green-300 rounded-full hover:text-white group hover:bg-gray-50">
                            <span class="absolute left-0 block w-full h-0 transition-all bg-green-300 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                            <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                                <svg
                                    class="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    ></path>
                                </svg>
                            </span>
                            <span class="relative">Create Event</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default EventForm;
