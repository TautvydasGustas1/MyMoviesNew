import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { clearState, getPopularMovies } from "../../../actions/movies";
import "./PopularMovies.css";
import MoviesCategory from "../../layout/MoviesCategory/MoviesCategory";

const PopularMovies = ({ getPopularMovies, movies, clearState }) => {
  return (
    <MoviesCategory
      getMovies={getPopularMovies}
      movies={movies}
      clearState={clearState}
      title="Popular Movies"
    />
  );
};

PopularMovies.propTypes = {
  getPopularMovies: PropTypes.func.isRequired,
  movies: PropTypes.object.isRequired,
  clearState: PropTypes.func,
};

const mapStateToProps = (state) => ({
  movies: state.movies,
});

export default connect(mapStateToProps, { getPopularMovies, clearState })(
  PopularMovies
);
