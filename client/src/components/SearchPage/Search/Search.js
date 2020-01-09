import React from 'react';
import PropTypes from 'prop-types';
import './Search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search = ({ searchMovie, startingQuery }) => {
	const search = (value) => {
		if (value !== '') {
			const query = startingQuery + value;
			searchMovie(query);
		}
	};

	return (
		<div>
			<div className='form-group has-search'>
				<span className='form-control-feedback'>
					<FontAwesomeIcon className='form-conrtrol-feddback' icon={faSearch} />{' '}
				</span>
				<input
					onKeyPress={(e) => e.key === 'Enter' && search(e.target.value)}
					type='text'
					className='form-control'
					placeholder='Search'
				/>
			</div>
		</div>
	);
};

Search.propTypes = {
	searchMovie: PropTypes.func.isRequired,
	startingQuery: PropTypes.string.isRequired
};

export default Search;
