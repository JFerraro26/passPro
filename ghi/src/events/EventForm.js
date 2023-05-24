import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function EventForm() {
  const { state } = useLocation();
  console.log(state);
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
    setCreatedBy("");
  } else {
    setTypeEvent(state.event.event_type);
    setNameEvent(state.event.event_name);
    var img = state.event.event_image;
    var dt = state.event.date;
    var st = state.event.start_time;
    var et = state.event.end_time;
    var des = state.event.description;
    var tm = state.event.tickets_max;
    var tp = state.event.tickets_price;
    var ven = state.event.venue;
    var cit = state.event.city;
    var statte = state.event.state_id;
    var cb = state.event.created_by;
  }

  const EventSubmitCreate = async (event) => {
    event.preventDefault();
    const data = {};
    data.event_type = typeEvent;
    data.event_name = nameEvent;
    data.event_image = imageEvent;
    data.date = date;
    data.start_time = startTime;
    data.end_time = endTime;
    data.description = description;
    data.tickets_sold = 0;
    data.tickets_max = ticketsMax;
    data.tickets_price = ticketsPrice;
    data.promoted = false;
    data.venue = venue;
    data.city = city;
    data.state_id = stateId;
    data.created_by = createdBy;
    const eventUrl = "http://localhost:8000/api/events";
    const eventFetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(eventUrl, eventFetchConfig);
    if (response.ok) {
      console.log("created");
    } else {
      console.error(response);
    }
  };

  const [typeEvent, setTypeEvent] = useState(type);
  const [nameEvent, setNameEvent] = useState(name);
  const [imageEvent, setImageEvent] = useState(img);
  const [date, setDate] = useState(dt);
  const [startTime, setStartTime] = useState(st);
  const [endTime, setEndTime] = useState(et);
  const [description, setDescription] = useState(des);
  const [ticketsMax, setTicketsMax] = useState(tm);
  const [ticketsPrice, setTicketsPrice] = useState(tp);
  const [venue, setVenue] = useState(ven);
  const [city, setCity] = useState(cit);
  const [stateId, setStateId] = useState(statte);
  const [createdBy, setCreatedBy] = useState(cb);

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
              type="number"
              id="tickets-price"
              name="tickets-price"
              placeholder="19.99"
              step="0.01"
              min="0"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="venue">Venue</label>
            <input
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className="border"
              type="text"
              id="venue"
              name="venue"
              placeholder="Venue..."
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="city">City</label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border"
              type="text"
              id="city"
              name="city"
              placeholder="City..."
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="state">State insert UUID here</label>
            <input
              value={stateId}
              onChange={(e) => setStateId(e.target.value)}
              className="border"
              type="text"
              id="state"
              name="state"
              placeholder="Need the state api done in order to create a dropdown here"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="created-by">Account UUID here</label>
            <input
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              className="border"
              type="text"
              id="created-by"
              name="created-by"
              placeholder="This will be handled automatically when on/off is implemented with account"
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
