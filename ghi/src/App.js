import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./nav/Nav";
import EventForm from "./events/EventForm";
import EventManager from "./events/EventManager";
import LoginForm from "./accounts/loginForm";
import SignUpForm from "./accounts/signUpForm.js";
import EventDetail from "./events/EventDetail";
import Cart from "./sales/cart";
import MyTickets from "./sales/MyTickets";
import MyProfile from "./accounts/myProfile";
import EventsList from "./events/EventsList";
import TicketsConfirmationPage from "./sales/ConfirmationPage";
import Footer from "./footer/Footer";
import ContactPage from "./footer/Contact";

function App() {
    const domain = /https:\/\/[^/]+/;
    const basename = process.env.PUBLIC_URL.replace(domain, "");

    return (
      <BrowserRouter basename={basename}>
        <div className="flex flex-col min-h-screen bg-green-100">
          <Nav />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/accounts">
                <Route path="login" element={<LoginForm />} />
                <Route path="signup" element={<SignUpForm />} />
                <Route path="profile" element={<MyProfile />} />
              </Route>
              <Route path="/events">
                <Route path="" element={<EventManager />} />
                <Route path="form" element={<EventForm />} />
                <Route path="detail" element={<EventDetail />} />
                <Route path="list" element={<EventsList />} />
              </Route>
              <Route path="/sales">
                <Route path="my-tickets" element={<MyTickets />} />
                <Route path="cart" element={<Cart />} />
                <Route
                  path="confirmation"
                  element={<TicketsConfirmationPage />}
                />
              </Route>
                        <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
}

export default App;
