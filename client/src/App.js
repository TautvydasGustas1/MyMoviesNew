import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css"; // @Change in the future
import MainPage from "./components/pages/MainPage/MainPage";
import { Provider } from "react-redux";
import store from "./store";
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
import TrendingMovies from "./components/pages/TrendingMovies/TrendingMovies";

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
              <Route exact path="/" component={MainPage} />
              <Route
                exact
                path="/movies/browse/trending"
                component={TrendingMovies}
              />
              <Route
                exact
                path="/movies/browse/popular"
                component={Popular_Movies}
              />
              <Route exact path="/movies/:id" component={Movie} />
              <Route exact path="/search" component={SearchPage} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
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
