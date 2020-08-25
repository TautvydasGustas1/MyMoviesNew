import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTrendingMovies, clearState } from "../../../actions/movies";
import "./TrendingMovies.css";
import MoviesCategory from "../../layout/MoviesCategory/MoviesCategory";

const TrendingMovies = ({ getTrendingMovies, movies, clearState }) => {
  return (
    <MoviesCategory
      getMovies={getTrendingMovies}
      movies={movies}
      clearState={clearState}
      title="Trending Movies"
    />
  );
};

TrendingMovies.propTypes = {
  getTrendingMovies: PropTypes.func.isRequired,
  movies: PropTypes.object.isRequired,
  clearState: PropTypes.func,
};

const mapStateToProps = (state) => ({
  movies: state.movies,
});

export default connect(mapStateToProps, { getTrendingMovies, clearState })(
  TrendingMovies
);
