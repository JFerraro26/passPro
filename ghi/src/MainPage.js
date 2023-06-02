import { useDispatch } from "react-redux";
import { setEvent } from "./redux/slices/eventSlice";
import { useState, useEffect } from "react";
function MainPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [events, setEvents] = useState([]);

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

  return (
    <div className="flex flex-col justify-center items-center h-400">
      <h1 className="text-7xl font-bold text-center">PassPro</h1>
      <div>
        <img className="" src="https://placehold.co/600x600" alt="Epic Image" />
      </div>

      <p className="text-center">Make that Money</p>
    </div>
  );
}

export default MainPage;
