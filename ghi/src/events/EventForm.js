import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import StateList from "../state_list/StateList";
import { useSelector } from "react-redux";

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
  const account = useSelector((state) => state.rootReducer.accountInfo.account);

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
      var eventUrl = `${process.env.REACT_APP_API_HOST}/api/events`;
      var eventFetchConfig = {
        method: "post",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      };
    } else {
      const eventId = state.event.id;
      var eventUrl = `${process.env.REACT_APP_API_HOST}/api/events/${eventId}`;
      var eventFetchConfig = {
        method: "put",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }
    const response = await fetch(eventUrl, eventFetchConfig);
    if (response.ok) {
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
      console.error(response);
    }
  };

  return (
    <div className="grid grid-cols-5">
      <div className="flex flex-col col-start-2 col-span-3 items-center">
        <h1>EventForm</h1>
        <form
          onSubmit={EventSubmitCreate}
          className="flex flex-col w-full gap-2"
        >
          <div className="flex flex-col">
            <label htmlFor="event-type">Event Type</label>
            <select
              value={typeEvent}
              onChange={(e) => setTypeEvent(e.target.value)}
              className="border"
              name="event-type"
              id="event-type"
              required
            >
              <option value="">Please Choose an event type</option>
              <option value="sport">Sport</option>
              <option value="theater">Theater</option>
              <option value="concert">Concert</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              value={nameEvent}
              onChange={(e) => setNameEvent(e.target.value)}
              className="border"
              required
              type="text"
              id="name"
              name="name"
              placeholder="Event Name..."
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="event-url">Picture Url</label>
            <input
              value={imageEvent}
              onChange={(e) => setImageEvent(e.target.value)}
              className="border"
              required
              type="text"
              id="event-url"
              name="event-url"
              placeholder="Event Picture Url..."
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="date">Date</label>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border"
              required
              type="date"
              id="date"
              name="date"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="start_time">Start Time</label>
            <input
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="border"
              required
              type="time"
              id="start_time"
              name="start_time"
            ></input>
          </div>
          <div className="flex flex-col">
            <label htmlFor="end_time">End Time</label>
            <input
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="border"
              required
              type="time"
              id="end_time"
              name="end_time"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="event-description">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border min-h-10"
              required
              type="text"
              name="event-description"
              placeholder="Description..."
              rows="7"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="tickets-max">
              How many tickets do you want to sell?
            </label>
            <input
              value={ticketsMax}
              onChange={(e) => setTicketsMax(e.target.value)}
              className="border"
              required
              type="number"
              id="tickets-max"
              name="tickets-max"
              min="1"
              placeholder="10"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="tickets-price">Ticket Price</label>
            <input
              value={ticketsPrice}
              onChange={(e) => setTicketsPrice(e.target.value)}
              className="border"
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
            <label htmlFor="city">City</label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border"
              required
              type="text"
              id="city"
              name="city"
              placeholder="City..."
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="venue">Venue</label>
            <input
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className="border"
              required
              type="text"
              id="venue"
              name="venue"
              placeholder="Venue..."
            />
          </div>
          <button className="border w-1/3 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default EventForm;
