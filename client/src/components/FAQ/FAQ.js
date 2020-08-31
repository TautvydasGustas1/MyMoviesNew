import React from 'react';

import './FAQ.css';

class FAQ extends React.Component {
    render() {
        return (
            <div className='container faq-container'>
                <div className='faq-container__title text-center mb-5'>
                    <h2>Information about website</h2>
                </div>
                <div className='faq-container__main-text mt-3'>
                    <div>
                        <h3>What can you do in this website?</h3>
                        <p>
                            You can look thru trending and popular movies. Also
                            you can create new account then rate, write reviews
                            and see other people opinions on films.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default FAQ;
