import React from 'react';
import PropTypes from 'prop-types';
import './Search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../../layout/Spinner/Spinner';
import { Dropdown } from 'react-bootstrap';

const Search = ({
    search,
    loading,
    dropdownState,
    setDropdownState,
    ddOptions
}) => {
    let timeout = 0;

    const handleSearchClick = value => {
        if (value !== '') {
            clearTimeout(timeout);
            search(value, dropdownState);
        }
    };

    const handleSearchWait = value => {
        if (value !== '') {
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
                search(value, dropdownState);
            }, 1300);
        }
    };

    return (
        <div className='row'>
            <div className='col-lg-10 col-7'>
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
                            e.key === 'Enter' &&
                            handleSearchClick(e.target.value)
                        }
                        onChange={e => handleSearchWait(e.target.value)}
                        type='text'
                        className='form-control'
                        placeholder='Search'
                    />
                </div>
            </div>
            <div className='col-lg-2 col-5'>
                <Dropdown>
                    <Dropdown.Toggle variant='secondary' id='dropdown-basic'>
                        Search By {dropdownState}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {ddOptions.map((option, index) => (
                            <Dropdown.Item
                                key={index}
                                onClick={() => setDropdownState(option)}
                            >
                                {option}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
};

Search.propTypes = {
    search: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
};

export default Search;
