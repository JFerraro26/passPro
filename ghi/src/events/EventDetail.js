import { useLocation } from "react-router-dom";

function EventDetail() {
  const { state } = useLocation();
  const event = state.event;

  return (
    <div className="grid grid-cols-5 grid-rows-4">
      <div className="flex flex-col items-center col-start-1 col-span-5 row-start-1 row-span-1">
        <img
          className="min-w-fit"
          src={event.event_image}
          alt={event.event_name}
        />
        <h1>{event.event_name}</h1>
      </div>
    </div>
  );
}
export default EventDetail;
