import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';

const calculateRatedMovies = (watched, rates) => {
    watched.forEach(movie => {
        if (movie.rate === 1) {
            rates[0].count++;
        } else if (movie.rate === 2) {
            rates[1].count++;
        } else if (movie.rate === 4) {
            rates[2].count++;
        } else if (movie.rate === 5) {
            rates[3].count++;
        }
    });
    return rates;
};

const calulateGenresSum = (watched, allGenres) => {
    watched.forEach(ele => {
        ele.genres.forEach(genre => {
            allGenres.forEach(obj => {
                if (obj.name === genre.name) {
                    obj.count++;
                }
            });
        });
    });
    return allGenres;
};

const Stats = ({ watched }) => {
    let rates = [
        {
            name: 'bad',
            count: 0
        },
        {
            name: 'average',
            count: 0
        },
        {
            name: 'good',
            count: 0
        },
        {
            name: 'perfect',
            count: 0
        }
    ];

    let allGenres = [
        {
            name: 'Action',
            count: 0
        },
        {
            name: 'Adventure',
            count: 0
        },
        {
            name: 'Animation',
            count: 0
        },
        {
            name: 'Comedy',
            count: 0
        },
        {
            name: 'Crime',
            count: 0
        },
        {
            name: 'Documentary',
            count: 0
        },
        {
            name: 'Drama',
            count: 0
        },
        {
            name: 'Family',
            count: 0
        },
        {
            name: 'Fantasy',
            count: 0
        },
        {
            name: 'History',
            count: 0
        },
        {
            name: 'Horror',
            count: 0
        },
        {
            name: 'Music',
            count: 0
        },
        {
            name: 'Mystery',
            count: 0
        },
        {
            name: 'Romance',
            count: 0
        },
        {
            name: 'Science Fiction',
            count: 0
        },
        {
            name: 'TV Movie',
            count: 0
        },
        {
            name: 'Thriller',
            count: 0
        },
        {
            name: 'War',
            count: 0
        },
        {
            name: 'Western',
            count: 0
        }
    ];

    useEffect(() => {
        calculateRatedMovies(watched, rates);
        calulateGenresSum(watched, allGenres);
        let genreData = [];
        allGenres.forEach(ele => {
            genreData.push(ele.count);
        });
        const rateData = rates.map(obj => obj.count);

        SetGenresChart({
            options: {
                xaxis: {
                    tickAmount: genreData.lenght
                }
            },
            series: [
                {
                    data: genreData
                }
            ]
        });

        setChartState({
            options: {
                yaxis: {
                    tickAmount: rateData.lenght
                }
            },
            series: [
                {
                    data: rateData
                }
            ]
        });
        // eslint-disable-next-line
    }, [watched]);

    const [rateChart, setChartState] = useState({
        options: {
            chart: {
                type: 'bar'
            },
            xaxis: {
                categories: ['Bad', 'Average', 'Good', 'Perfect']
            },
            yaxis: {
                labels: {
                    formatter: function(val) {
                        return val;
                    }
                },
                forceNiceScale: true
            }
        },
        series: [
            {
                name: 'Movies rate',
                data: []
            }
        ]
    });

    const [genresChart, SetGenresChart] = useState({
        options: {
            chart: {
                type: 'bar'
            },
            plotOptions: {
                bar: {
                    horizontal: false
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: [
                    'Action',
                    'Adventure',
                    'Animation',
                    'Comedy',
                    'Crime',
                    'Documentary',
                    'Drama',
                    'Family',
                    'Fantasy',
                    'History',
                    'Horror',
                    'Music',
                    'Mystery',
                    'Romance',
                    'Science Fiction',
                    'TV Movie',
                    'Thriller',
                    'War',
                    'Western'
                ],
                forceNiceScale: true
            }
        },
        series: [
            {
                name: 'Genres',
                data: []
            }
        ]
    });

    return (
        <Fragment>
            <div className='stats-container'>
                <div className='row'>
                    <div className='col-lg-6 col-12'>
                        <Chart
                            options={rateChart.options}
                            series={rateChart.series}
                            type='bar'
                            width='100%'
                        />
                    </div>
                    <div className='col-lg-6 col-12'>
                        <Chart
                            options={genresChart.options}
                            series={genresChart.series}
                            type='bar'
                            width='100%'
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

Stats.propTypes = {
    watched: PropTypes.array
};

export default Stats;
