import { useDispatch } from "react-redux";
import { setEvent } from "./redux/slices/eventSlice";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { MdSportsBasketball } from "react-icons/md";
import { FaTheaterMasks, FaMusic } from "react-icons/fa";

function MainPage() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(1);
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(2);
  const [events, setEvents] = useState([]);
  const eventDispatch = useDispatch();

  useEffect(() => {
    async function getEventData() {
      const response = await fetch(
        `${process.env.REACT_APP_API_HOST}/api/events`
      );
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        console.error(response);
      }
    }
    getEventData();
  }, []);

  const leftClick = () => {
    if (leftIndex === 0) {
      setCurrentIndex(currentIndex - 1);
      setLeftIndex(events.length - 1);
      setRightIndex(rightIndex - 1);
    } else if (currentIndex === 0) {
      setCurrentIndex(events.length - 1);
      setLeftIndex(leftIndex - 1);
      setRightIndex(rightIndex - 1);
    } else if (rightIndex === 0) {
      setCurrentIndex(currentIndex - 1);
      setLeftIndex(leftIndex - 1);
      setRightIndex(events.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
      setLeftIndex(leftIndex - 1);
      setRightIndex(rightIndex - 1);
    }
  };

  const rightClick = () => {
    if (rightIndex === events.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setLeftIndex(leftIndex + 1);
      setRightIndex(0);
    } else if (currentIndex === events.length - 1) {
      setCurrentIndex(0);
      setLeftIndex(leftIndex + 1);
      setRightIndex(rightIndex + 1);
    } else if (leftIndex === events.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setLeftIndex(0);
      setRightIndex(rightIndex + 1);
    } else {
      setCurrentIndex(currentIndex + 1);
      setLeftIndex(leftIndex + 1);
      setRightIndex(rightIndex + 1);
    }
  };

  const goToEvent = () => {
    eventDispatch(setEvent(events[currentIndex]));
    navigate("/events/detail");
  };

  const goToEventsList = (state) => {
    navigate("/events/list", { state });
  };

  return (
    <>
      {events ? (
        <div className="grid grid-cols-5">
          <div className="flex flex-col justify-center content-center col-start-1 col-span-1 mt-12">
            <div className="grid grid-cols-4 grid-rows-5 m-2">
              <div className="relative shadow-xl shadow-blue-500 border-4 border-blue-500 rounded-3xl overflow-hidden aspect-video col-start-1 col-span-4 row-start-1 row-span-5">
                <img
                  className="absolute top-0 left-0 object-cover opacity-50 w-full h-full"
                  src={events[rightIndex]?.event_image}
                  alt="event"
                />
              </div>
              <div className="flex z-0 justify-center items-center col-start-1 col-span-4 row-start-1 row-span-1">
                <h1 className="text-xs truncate font-semibold">
                  {events[rightIndex]?.event_name}
                </h1>
              </div>
              <div className="flex z-0 justify-center items-center col-start-1 col-span-2 row-start-5 row-span-1">
                <h1 className="text-xs truncate font-semibold">
                  {events[rightIndex]?.city}, {events[rightIndex]?.state_id}{" "}
                </h1>
              </div>
              <div className="flex z-0 justify-center items-center col-start-3 col-span-2 row-start-5 row-span-1">
                <h1 className="text-xs truncate font-semibold">
                  {dayjs(events[rightIndex]?.date).format("MM-DD-YY")}
                </h1>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center content-center col-start-2 col-span-3 mt-2.5">
            <h1 className="text-7xl font-bold text-center">PassPro</h1>
            <div className="grid grid-cols-4 grid-rows-5 m-2">
              <div className="relative shadow-xl shadow-blue-500 border-4 border-blue-500 rounded-3xl overflow-hidden aspect-video col-start-1 col-span-4 row-start-1 row-span-5">
                <img
                  onClick={goToEvent}
                  className="absolute top-0 left-0 object-cover opacity-50 w-full h-full cursor-pointer"
                  src={events[currentIndex]?.event_image}
                  alt="event"
                />
              </div>
              <div className="flex z-0 justify-center items-center col-start-1 col-span-4 row-start-1 row-span-1">
                <h1 className="text-3xl truncate font-semibold">
                  {events[currentIndex]?.event_name}
                </h1>
              </div>
              <div className="flex z-0 justify-center items-center col-start-1 col-span-2 row-start-5 row-span-1">
                <h1 className="text-2xl truncate font-semibold">
                  {events[currentIndex]?.city}, {events[currentIndex]?.state_id}{" "}
                </h1>
              </div>
              <div className="flex z-0 justify-center items-center col-start-3 col-span-2 row-start-5 row-span-1">
                <h1 className="text-2xl truncate font-semibold">
                  {dayjs(events[currentIndex]?.date).format("MM-DD-YY")}
                </h1>
              </div>
              <div className="z-0 flex justify-start items-center col-start-1 col-span-1 row-start-3 row-span-1">
                <button
                  className="text-5xl hover:text-blue-500"
                  onClick={leftClick}
                >
                  {<FiChevronsLeft />}
                </button>
              </div>
              <div className="z-0 flex justify-end items-center col-start-4 col-span-1 row-start-3 row-span-1">
                <button
                  className="text-5xl hover:text-blue-500"
                  onClick={rightClick}
                >
                  {<FiChevronsRight />}
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center content-center col-start-5 col-span-1 mt-12">
            <div className="grid grid-cols-4 grid-rows-5 m-2">
              <div className="relative shadow-xl shadow-blue-500 border-4 border-blue-500 rounded-3xl overflow-hidden aspect-video col-start-1 col-span-4 row-start-1 row-span-5">
                <img
                  className="absolute top-0 left-0 object-cover opacity-50 w-full h-full"
                  src={events[leftIndex]?.event_image}
                  alt="event"
                />
              </div>
              <div className="flex z-0 justify-center items-center col-start-1 col-span-4 row-start-1 row-span-1">
                <h1 className="text-xs truncate font-semibold">
                  {events[leftIndex]?.event_name}
                </h1>
              </div>
              <div className="flex z-0 justify-center items-center col-start-1 col-span-2 row-start-5 row-span-1">
                <h1 className="text-xs truncate font-semibold">
                  {events[leftIndex]?.city}, {events[leftIndex]?.state_id}{" "}
                </h1>
              </div>
              <div className="flex z-0 justify-center items-center col-start-3 col-span-2 row-start-5 row-span-1">
                <h1 className="text-xs truncate font-semibold">
                  {dayjs(events[leftIndex]?.date).format("MM-DD-YY")}
                </h1>
              </div>
            </div>
          </div>
          <div className="flex justify-evenly col-start-1 col-span-5 mt-12">
            <button
              className="w-20 h-18 flex flex-col items-center shadow-md shadow-blue-500 border-4 border-blue-500 rounded-md overflow-hidden p-1 hover:bg-blue-500 hover:text-white"
              onClick={() => goToEventsList("sport")}
            >
              <p>Sports</p>
              <MdSportsBasketball />
            </button>
            <button
              className="w-20 h-18 flex flex-col items-center shadow-md shadow-blue-500 border-4 border-blue-500 rounded-md overflow-hidden p-1 hover:bg-blue-500 hover:text-white"
              onClick={() => goToEventsList("theater")}
            >
              <p>Theater</p>
              <FaTheaterMasks />
            </button>
            <button
              className="w-20 h-18 flex flex-col items-center shadow-md shadow-blue-500 border-4 border-blue-500 rounded-md overflow-hidden p-1 hover:bg-blue-500 hover:text-white"
              onClick={() => goToEventsList("concert")}
            >
              <p>Concerts</p>
              <FaMusic />
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default MainPage;
