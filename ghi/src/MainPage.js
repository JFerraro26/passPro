import { useDispatch } from "react-redux";
import { setEvent } from "./redux/slices/eventSlice";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

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
                                    {events[rightIndex]?.city},{" "}
                                    {events[rightIndex]?.state_id}{" "}
                                </h1>
                            </div>
                            <div className="flex z-0 justify-center items-center col-start-3 col-span-2 row-start-5 row-span-1">
                                <h1 className="text-xs truncate font-semibold">
                                    {dayjs(events[rightIndex]?.date).format(
                                        "MM-DD-YY"
                                    )}
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center content-center col-start-2 col-span-3 mt-2.5">
                        <h1 className="text-7xl font-bold text-center">
                            PassPro
                        </h1>
                        <div className="grid grid-cols-4 grid-rows-5 m-2">
                            <div className="relative shadow-xl shadow-blue-500 border-4 border-blue-500 rounded-3xl overflow-hidden aspect-video col-start-1 col-span-4 row-start-1 row-span-5">
                                <img
                                    onClick={goToEvent}
                                    className="absolute top-0 left-0 object-cover opacity-50 w-full h-full cursor-pointer ease-in duration-200 hover:opacity-75"
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
                                    {events[currentIndex]?.city},{" "}
                                    {events[currentIndex]?.state_id}{" "}
                                </h1>
                            </div>
                            <div className="flex z-0 justify-center items-center col-start-3 col-span-2 row-start-5 row-span-1">
                                <h1 className="text-2xl truncate font-semibold">
                                    {dayjs(events[currentIndex]?.date).format(
                                        "MM-DD-YY"
                                    )}
                                </h1>
                            </div>
                            <div className="z-0 flex justify-start items-center col-start-1 col-span-1 row-start-3 row-span-1">
                                <button
                                    className="text-5xl hover:text-blue-500 hover:scale-150"
                                    onClick={leftClick}
                                >
                                    {<FiChevronsLeft />}
                                </button>
                            </div>
                            <div className="z-0 flex justify-end items-center col-start-4 col-span-1 row-start-3 row-span-1">
                                <button
                                    className="text-5xl hover:text-blue-500 hover:scale-150"
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
                                    {events[leftIndex]?.city},{" "}
                                    {events[leftIndex]?.state_id}{" "}
                                </h1>
                            </div>
                            <div className="flex z-0 justify-center items-center col-start-3 col-span-2 row-start-5 row-span-1">
                                <h1 className="text-xs truncate font-semibold">
                                    {dayjs(events[leftIndex]?.date).format(
                                        "MM-DD-YY"
                                    )}
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-evenly col-start-1 col-span-5 mt-12">
                        <button onClick={() => goToEventsList("sport")}>
                            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative ease-in-out duration-200 hover:scale-110">
                                <img
                                    className="rounded-t-lg h-64 opacity-25 hover:opacity-50 ease-in-out duration-200"
                                    src="https://media.istockphoto.com/id/469569148/photo/soccer-fans-at-stadium.jpg?s=612x612&w=0&k=20&c=onoPfo3cZe9fH_F_9lXB1d1n3w2HGs2o6640lC-OFZg="
                                    alt="product"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-orange-500 via-transparent to-transparent px-5 py-3">
                                    <h5 className="text-xl font-semibold tracking-tight text-black drop-shadow-md">
                                        SportsBall
                                    </h5>
                                </div>
                            </div>
                        </button>
                        <button onClick={() => goToEventsList("theater")}>
                            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative ease-in-out duration-200 hover:scale-110">
                                <img
                                    className="rounded-t-lg h-64 opacity-25 hover:opacity-50"
                                    src="https://img.bizbash.com/files/base/bizbash/bzb/image/2015/04/22069178_23484_111806495503601_5666828_n.png?ar=16%3A9&auto=format%2Ccompress&crop=focalpoint&fit=crop&fp-x=0.5&fp-y=0.5&h=639&q=70&w=1136"
                                    alt="product"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-orange-500 via-transparent to-transparent px-5 py-3">
                                    <h5 className="text-xl font-semibold tracking-tight text-black drop-shadow-md">
                                        Theater
                                    </h5>
                                </div>
                            </div>
                        </button>
                        <button onClick={() => goToEventsList("concert")}>
                            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative ease-in-out duration-200 hover:scale-110">
                                <img
                                    className="rounded-t-lg h-64 opacity-25 hover:opacity-50"
                                    src="https://connorgroup.com/static/4bb1b295ecca0123d20cd18be8066649/cd40e/Concerts_near_San_Antonio-scaled.jpg"
                                    alt="product"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-orange-500 via-transparent to-transparent px-5 py-3">
                                    <h5 className="text-xl font-semibold tracking-tight text-black drop-shadow-md">
                                        Concerts
                                    </h5>
                                </div>
                            </div>
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
