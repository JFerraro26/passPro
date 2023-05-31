import { useDispatch } from "react-redux";
import { setEvent } from "./redux/slices/eventSlice";

function MainPage() {
  const testRedux = useDispatch();
  return (
    <>
      <div className="flex flex-col justify-center items-center h-400">
        <h1 className="text-7xl font-bold text-center">PassPro</h1>
        <img className="" src="https://placehold.co/600x600" alt="Epic Image" />
        <p className="text-center">Make that Money</p>
        <button
          onClick={() => testRedux(setEvent({ data: "new", more: "old" }))}
          className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full"
        >
          Click me
        </button>
      </div>
    </>
  );
}

export default MainPage;
