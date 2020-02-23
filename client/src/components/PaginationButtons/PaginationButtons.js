import React from 'react';
import PropTypes from 'prop-types';

const PaginationButtons = ({ page, total_pages, callBackPageNumber }) => {
    const nextPage = current_page => {
        current_page + 1 <= total_pages && callBackPageNumber(current_page + 1);
    };

    const prevPage = current_page => {
        current_page !== 1 && callBackPageNumber(current_page - 1);
    };

    return (
        <div className='d-inline-flex'>
            <ul className='pagination pagination-lg'>
                <li className={'page-item ' + (page === 1 && 'disabled')}>
                    <button
                        onClick={() => {
                            prevPage(page);
                        }}
                        className='page-link'
                        aria-label='Previous'
                    >
                        <span aria-hidden='true'>&laquo;</span>
                        <span className='sr-only'>Previous</span>
                    </button>
                </li>
                <li className='page-item'>
                    <button className='page-link'>{page}</button>
                </li>
                <li
                    className={
                        'page-item ' + (page + 1 > total_pages && 'disabled')
                    }
                >
                    <button
                        onClick={() => {
                            nextPage(page);
                        }}
                        className='page-link'
                        aria-label='Next'
                    >
                        <span aria-hidden='true'>&raquo;</span>
                        <span className='sr-only'>Next</span>
                    </button>
                </li>
            </ul>
        </div>
    );
};

PaginationButtons.propTypes = {
    callBackPageNumber: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    total_pages: PropTypes.number.isRequired
};

export default PaginationButtons;
