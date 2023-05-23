import { useState } from "react";
import useToken, { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useToken();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    e.target.reset();
  };

  return (
    <div className="container mx-auto">
      <h5 className="flex justify-center">Login</h5>
      <div className="flex justify-center">
        <form className="grid-cols-2" onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <label className="m-8">Username:</label>
            <input
              name="username"
              type="text"
              className="border-4 rounded-lg"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="px-5">Password:</label>
            <input
              name="password"
              type="password"
              className="border-4 rounded-lg"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              className="transition ease-in-out delay-150 hover:bg-sky-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 rounded text-white content-center shadow-lg cursor-pointer h-23"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
