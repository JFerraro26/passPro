import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./nav/Nav";
import EventForm from "./events/EventForm";
import EventManager from "./events/EventManager";
import { useEffect, useState } from "react";
import ErrorNotification from "./ErrorNotification";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import LoginForm from "./accounts/login.js";

function App() {
  return (
    <AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
      <BrowserRouter>
        <Nav />
        <div>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/events">
              <Route path="" element={<EventManager />} />
              <Route path="form" element={<EventForm />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
