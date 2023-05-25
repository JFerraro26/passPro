import { useLocation } from "react-router-dom";

function EventDetail() {
  const { state } = useLocation();
  const event = state.event;

  return (
    <div className="grid grid-cols-5 grid-rows-4">
      <div className="flex col-start-1 col-end-5 row-start-1 row-span-1">
        <img className="w-full" src={event.event_image} />
      </div>
    </div>
  );
}
export default EventDetail;
