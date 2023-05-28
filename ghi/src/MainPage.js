import { useGetTokenQuery } from "./store/accountsApi";
import store from "./store/store";

function MainPage() {
  console.log(useGetTokenQuery(store));
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-7xl font-bold text-center">PassPro</h1>
      <img className="" src="https://placehold.co/600x600" alt="Epic Image" />
      <p className="text-center">Make that Money</p>
    </div>
  );
}

export default MainPage;
