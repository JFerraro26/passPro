import { useState } from "react";
import LoginForm from "../accounts/loginForm";
import SignUpForm from "../accounts/signUpForm";

function LogInPopUP() {
    const [open, setOpen] = useState(false);
    const [login, setLogin] = useState(false);
    return (
        <div className="relative">
            <button
                className="relative block text-2xl font-semibold hover:text-red-500"
                onClick={() => setOpen(true)}
            >
                Login/SignUp
            </button>
            {open ? (
                <div className="fixed z-10 top-0 left-0 h-full w-full">
                    <div className="m-16 grid grid-cols-5 grid-rows-5">
                        <div className="bg-orange-100 flex flex-col col-start-2 col-span-3 row-start-1 row-span-3 border-4 border-blue-500 rounded-2xl mt-16">
                            <div className="m-8">
                                <button onClick={() => setOpen(false)}>
                                    exit
                                </button>
                                {login ? (
                                    <div className="flex flex-col">
                                        <SignUpForm setOpen={setOpen} />
                                        <button
                                            onClick={() => setLogin(!login)}
                                            className="mt-4 underline hover:text-blue-500 transition-all"
                                        >
                                            Already have an account? Click Here!
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col">
                                        <LoginForm setOpen={setOpen} />
                                        <button
                                            onClick={() => setLogin(!login)}
                                            className="mt-4 underline hover:text-blue-500 transition-all"
                                        >
                                            Need an account? Sign Up Here!
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default LogInPopUP;
