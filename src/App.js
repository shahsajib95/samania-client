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
import PaymentDetails from "./components/PaymentDetails/PaymentDetails";
import Footer from "./components/Footer/Footer";
import Notice from "./components/Notice/Notice";
import AllPayment from "./components/AllPayment/AllPayment";
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

      <Notice />
      <NavBar />

      <Router>
        <Switch>

          <Route exact path="/">
            {!userData ? <Banner /> : <AfterLoginBanner />}
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

          <Route path="/payment/:id/:name">
            <PaymentDetails />
          </Route>
          <Route path="/allPayments">
            <AllPayment />
          </Route>

        </Switch>

      </Router>

      <Footer />


    </div>
  );
}

export default App;
