import React, { Fragment } from "react";
import "./MainPage.css";
import { withRouter } from "react-router-dom";
import MovieCardWide from "../../Movies/MovieCardWide/MovieCardWide";
import trendingMoviesImage from "../../images/trending-image.jpg";
import popularMoviesImage from "../../images/popular-image.jpg";
import FAQ from "../../FAQ/FAQ";

const MainPage = () => {
  return (
    <Fragment>
      <div className="main-banner_container text-center mb-5">
        <h1>MyMovies</h1>
      </div>
      <div className="row">
        <div className="col-lg-6 col-12">
          <MovieCardWide
            link="/movies/browse/trending"
            image={trendingMoviesImage}
            title={"Trending Movies"}
            text={"The daily trending movies on TMDb"}
          />
        </div>
        <div className="col-lg-6 col-12">
          <MovieCardWide
            link="/movies/browse/popular"
            image={popularMoviesImage}
            title={"Popular Movies"}
            text={"List of the current popular movies on TMDb"}
          />
        </div>
      </div>
      <FAQ />
    </Fragment>
  );
};

export default withRouter(MainPage);
