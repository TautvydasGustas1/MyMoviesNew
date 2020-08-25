import React from "react";
import Spinner from "../../layout/Spinner/Spinner";
import PaginationButtons from "../../PaginationButtons/PaginationButtons";
import PosterCard from "../../PosterCard/PosterCard";
import PropTypes from "prop-types";

const MoviesCategoryContent = ({
  movies: { movies, isFetching },
  handlePaginationCallback,
  title,
}) => (
  <section className="browse-container">
    <div className="browse_summary-container text-center">
      <h1>{title}</h1>
    </div>
    <div className="browse_movies-container mt-5">
      {!isFetching && movies.length !== 0 ? (
        <div className="browse_movies-container_inner">
          <div className="row justify-content-start">
            {movies.results.map((movie) => (
              <div key={movie.id} className="col-4 col-md-3 col-lg-2dot4">
                <PosterCard
                  title={movie.title}
                  id={movie.id}
                  poster_path={movie.poster_path}
                />
              </div>
            ))}
          </div>
          <div className="pagination-outer text-center">
            <PaginationButtons
              callBackPageNumber={handlePaginationCallback}
              page={movies.page}
              total_pages={movies.total_pages}
            />
          </div>
        </div>
      ) : (
        <div className="text-center">
          <Spinner width="300px" />
        </div>
      )}
    </div>
  </section>
);

MoviesCategoryContent.propTypes = {
  movies: PropTypes.object.isRequired,
  handlePaginationCallback: PropTypes.func,
  title: PropTypes.string,
};

export default MoviesCategoryContent;
