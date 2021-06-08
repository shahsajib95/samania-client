import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from "./components/NavBar/NavBar";
import { activeDarkmode, deactiveDarkmode } from "./components/redux/actions/DarkModeActions";
import Banner from "./components/Banner/Banner";
import LoginFB from "./components/Login/LoginFB";
import User from "./components/User/User";
import Register from "./components/Login/Register";
import AfterLoginBanner from "./components/Banner/AfterLoginBanner";
import PaymentFund from "./components/PaymentDetails/PaymentFund";
import Footer from "./components/Footer/Footer";
import Notice from "./components/Notice/Notice";
import AllPayment from "./components/AllPayment/AllPayment";
import PaymentSavings from "./components/PaymentDetails/PaymentSavings";
import { LanguageProvider } from "./components/context/Language";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import AdminLogin from "./components/Admin/Login/AdminLogin";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import AdminPrivateRoute from "./components/AdminPrivateRoute/AdminPrivateRoute";
import PendingUsers from "./components/Admin/User/PendingUsers";
import AllMembers from "./components/Admin/Members/AllMembers";
import AdminEvent from "./components/Admin/Event/AdminEvent";
import Events from "./components/Events/Events";
import EventPaymentForm from "./components/Events/EventPaymentForm";
import EventsDetails from "./components/Events/EventsDetails";
import ShowEvents from "./components/Admin/Event/ShowEvents";

export const userData = JSON.parse(localStorage.getItem('user'))

function App() {

  const data = localStorage.getItem('mode')
  const dispatch = useDispatch()


  useEffect(() => {
    if (data === 'active') {
      dispatch(activeDarkmode(true))
    } else {
      dispatch(deactiveDarkmode(false))
    }
  }, [dispatch, data])

  const { color, text } = useSelector(state => state.modeData)

  return (
    <div style={{ backgroundColor: color, color: text }}>
      <LanguageProvider>
        <Notice />

        <Router>
          <NavBar />
          <Switch>

            <Route exact path="/">
              {!userData ? <Banner /> : <AfterLoginBanner />}
              {/* <Members /> */}
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>

            <Route path="/login">
              <LoginFB />
            </Route>
            <Route path="/register">
              <Register />
            </Route>

            <Route exact path="/:id/:name">
              <User />
            </Route>

            <Route path="/payment/fund/:id/:name">
              <PaymentFund />
            </Route>
            <Route path="/payment/savings/:id/:name">
              <PaymentSavings />
            </Route>


            <Route path="/allEvents">
              <Events />
            </Route>
            <Route path="/eventDetails/:evID/:evName">
              <EventsDetails />
            </Route>
            <Route path="/event/:evID/:evName">
              <EventPaymentForm />
            </Route>

            <Route path="/paid/:id/:name">
              <AllPayment />
            </Route>

            <Route path="/admin">
              <AdminLogin />
            </Route>

            <AdminPrivateRoute path="/dashboard">
              <Dashboard />
            </AdminPrivateRoute>

            <AdminPrivateRoute  path="/all-Members">
              <AllMembers />
            </AdminPrivateRoute>
            <AdminPrivateRoute  path="/pending-users">
              <PendingUsers />
            </AdminPrivateRoute>
            <AdminPrivateRoute  path="/addEvent">
              <AdminEvent />
            </AdminPrivateRoute>
            <AdminPrivateRoute  path="/showEvents">
              <ShowEvents />
            </AdminPrivateRoute>

          </Switch>

        </Router>

        <Footer />

      </LanguageProvider>
    </div>
  );
}

export default App;
