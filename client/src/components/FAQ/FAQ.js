import React from 'react';

import './FAQ.css';

class FAQ extends React.Component {
render() {
    return(
        <div className="container faq-container">
            <div className="faq-container__title">
                <h2>Frequently Asked Questions</h2>
            </div>
            <div className="faq-container__main-text">
                <div>
                    <h3>How does the Taste App work?</h3>
                    <p>Ever met someone with a frighteningly similar taste? We discovered that this is often the best person to suggest something you might like. Your recommendations on Taste come from the collective souls of people who are extremely similar to you.</p>
                </div>
                <div>
                    <h3>How is it different from other review platforms?</h3>
                    <p>Most review platforms are generic (two people see the same ratings and reviews). Taste is the leading movie and TV app that personalizes ratings and reviews based on your taste. Unlike Rotten Tomatoes, IMDB, Metacritic, and Fandango, Taste is gender-neutral and has no commercial bias.</p>
                </div>
                <div>
                    <h3>What algorithm do you use? And what exactly does the Match% mean?</h3>
                    <p>Taste uses several collaborative filtering algorithms—it’s a lot like asking the top 1% of the world most similar to you to suggest what to watch. The Match% you see for each movie and show measures how much (and how much more compared to the average Joe) you would enjoyed a movie. It also factors in recency, serendipity, and rarity to help you discover the not-so-obvious recommendations.</p>
                </div>
                <div>
                    <h3>Where can I get the app?</h3>
                    <p>The Taste App is available in the iTunes App Store, Google Play Store, or you can login directly using a web browser.</p>
                </div>
            </div>
        </div>
    );
}
}

export default FAQ;