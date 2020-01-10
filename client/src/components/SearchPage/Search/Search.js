import React from 'react';
import PropTypes from 'prop-types';
import './Search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search = ({ search }) => {
	const handleSearchClick = (value) => {
		if (value !== '') {
			search(value);
		}
	};

	return (
		<div>
			<div className='form-group has-search'>
				<span className='form-control-feedback'>
					<FontAwesomeIcon className='form-conrtrol-feddback' icon={faSearch} />{' '}
				</span>
				<input
					onKeyPress={(e) => e.key === 'Enter' && handleSearchClick(e.target.value)}
					type='text'
					className='form-control'
					placeholder='Search'
				/>
			</div>
		</div>
	);
};

Search.propTypes = {
	search: PropTypes.func.isRequired
};

export default Search;
