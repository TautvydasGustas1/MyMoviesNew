import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css"; // @Change in the future
import Movies from "./components/Movies/Movies";
import { Provider } from "react-redux";
import store from "./store";
import Browse from "./components/Browse/Browse";
import Movie from "./components/Movies/Movie/Movie";
import SearchPage from "./components/SearchPage/SearchPage";
import Login from "./components/auth/Login/Login";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";
import Register from "./components/auth/Register/Register";
import Alert from "./components/layout/Alerts/Alert";
import Profile from "./components/Profile/Profile";
import { loadUser } from "./actions/auth";
import Popular_Movies from "./components/Popular Movies/Popular_Movies";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import "./fonts/Rubik-Regular.ttf";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alert />
          <section className="container mt-container">
            <Switch>
              <Route exact path="/" component={Movies} />
              <Route exact path="/movies/browse/trending" component={Browse} />
              <Route exact path="/movies/:id" component={Movie} />
              <Route exact path="/search" component={SearchPage} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route
                exact
                path="/movies/browse/popular"
                component={Popular_Movies}
              />
              <PrivateRoute
                exact
                path="/profile/:username"
                component={Profile}
              />
              <Route component={NotFoundPage} />
            </Switch>
          </section>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
//<PrivateRoute exact path='/dashboard' component={Login} />
