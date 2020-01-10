import React from 'react';
import PropTypes from 'prop-types';

const PaginationButtons = ({ page, total_pages, callBackPageNumber }) => {
	const nextPage = (current_page) => {
		current_page + 1 <= total_pages && callBackPageNumber(current_page + 1);
	};

	const prevPage = (current_page) => {
		current_page !== 1 && callBackPageNumber(current_page - 1);
	};

	return (
		<div className='d-inline-flex'>
			<button
				onClick={() => {
					prevPage(page);
				}}
				className={'btn btn-primary ' + (page === 1 && 'disabled')}
			>
				Prev
			</button>
			<div>Page: {page}</div>
			<button
				onClick={() => {
					nextPage(page);
				}}
				className={'btn btn-primary ' + (page + 1 > total_pages && 'disabled')}
			>
				Next
			</button>
		</div>
	);
};

PaginationButtons.propTypes = {
	callBackPageNumber: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	total_pages: PropTypes.number.isRequired
};

export default PaginationButtons;
