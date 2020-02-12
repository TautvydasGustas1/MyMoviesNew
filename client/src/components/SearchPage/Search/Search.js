import React from 'react';
import PropTypes from 'prop-types';
import './Search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../../layout/Spinner/Spinner';

const Search = ({ search, loading }) => {
    let timeout = 0;

    const handleSearchClick = value => {
        if (value !== '') {
            clearTimeout(timeout);
            search(value);
        }
    };

    const handleSearchWait = value => {
        if (value !== '') {
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
                search(value);
            }, 1300);
        }
    };

    return (
        <div>
            <div className='form-group has-search'>
                <span className='form-control-feedback'>
                    {loading ? (
                        <Spinner width='35px' />
                    ) : (
                        <FontAwesomeIcon
                            className='form-conrtrol-feddback'
                            icon={faSearch}
                        />
                    )}
                </span>
                <input
                    onKeyPress={e =>
                        e.key === 'Enter' && handleSearchClick(e.target.value)
                    }
                    onChange={e => handleSearchWait(e.target.value)}
                    type='text'
                    className='form-control'
                    placeholder='Search'
                />
            </div>
        </div>
    );
};

Search.propTypes = {
    search: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
};

export default Search;
