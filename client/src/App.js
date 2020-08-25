import "bootstrap/dist/css/bootstrap.min.css"; // @Change in the future
import React, { Fragment, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { loadUser } from "./actions/auth";
import "./App.css";
import Login from "./components/auth/Login/Login";
import Register from "./components/auth/Register/Register";
import Alert from "./components/layout/Alerts/Alert";
import Footer from "./components/layout/Footer/Footer";
import Navbar from "./components/layout/Navbar";
import Movie from "./components/Movies/Movie/Movie";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import MainPage from "./components/pages/MainPage/MainPage";
import PopularMovies from "./components/pages/PopularMovies/PopularMovies";
import TrendingMovies from "./components/pages/TrendingMovies/TrendingMovies";
import Profile from "./components/Profile/Profile";
import PrivateRoute from "./components/routing/PrivateRoute";
import SearchPage from "./components/SearchPage/SearchPage";
import "./fonts/Rubik-Regular.ttf";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";

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
                component={PopularMovies}
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
