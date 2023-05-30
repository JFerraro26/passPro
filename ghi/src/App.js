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
import EditAccountForm from "./accounts/editAccountForm";
import EditAccountFormContainer from "./accounts/editAccountForm";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/accounts">
          <Route path="" element={<EditAccountFormContainer />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="signup" element={<SignUpForm />} />
        </Route>
        <Route path="/events">
          <Route path="" element={<EventManager />} />
          <Route path="form" element={<EventForm />} />
          <Route path="detail" element={<EventDetail />} />
        </Route>
        <Route path="/sales">
          <Route path="my-tickets" element={<MyTickets />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
