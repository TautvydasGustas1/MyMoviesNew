import PropTypes from "prop-types";
import React, { useEffect } from "react";
import MoviesCategoryContent from "./MoviesCategoryContent";

const MoviesCategory = ({ getMovies, movies, clearState, title }) => {
  useEffect(() => {
    getMovies(1);
    return () => {
      clearState();
    };
  }, [getMovies, clearState]);

  const handlePaginationCallback = (page_number) => {
    window.scrollTo(0, 0);
    getMovies(page_number);
  };

  return (
    <MoviesCategoryContent
      handlePaginationCallback={handlePaginationCallback}
      movies={movies}
      title={title}
    />
  );
};

MoviesCategory.propTypes = {
  getMovies: PropTypes.func.isRequired,
  movies: PropTypes.object.isRequired,
  clearState: PropTypes.func,
  title: PropTypes.string,
};

export default MoviesCategory;
