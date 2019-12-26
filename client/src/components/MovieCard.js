import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import './MovieCard.css';
import photo from '../../images/movie2.jpg'


const MovieCard = (props) => {
  const {Title, poster_path} = props;
  return (

    <div className="card m-1 cardStyle shadow">
        <h3 className="textStyle">{Title}</h3>
        <div className="cardHover">
          <img className="card-img-top rounded" src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="Image missing"/>
        </div>
    </div>
  )
}


export default MovieCard;