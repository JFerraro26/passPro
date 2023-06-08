import { useState } from "react";
import LoginForm from "../accounts/loginForm";
import SignUpForm from "../accounts/signUpForm";

function LogInPopUP() {
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(false);
  return (
    <div className="relative">
      <button
        className="m-2 p-2 bg-white rounded-lg w-full"
        onClick={() => setOpen(!open)}
      >
        Login/SignUp
      </button>
      {open ? (
        <div className="fixed top-0 left-0 h-full w-full">
          <div className="m-16 grid grid-cols-5 grid-rows-5">
            <div className="bg-orange-100 flex flex-col col-start-2 col-span-3 row-start-1 row-span-3 border-4 border-blue-500 rounded-2xl mt-16">
              <div className="m-8">
                {login ? <LoginForm /> : <SignUpForm />}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default LogInPopUP;
