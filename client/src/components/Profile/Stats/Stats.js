import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';

let rates = {
	bad: 0,
	average: 0,
	good: 0,
	perfect: 0
};

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

const calculateRatedMovies = (watched) => {
	watched.forEach((movie) => {
		if (movie.rate === 1) {
			rates.bad++;
		} else if (movie.rate === 2) {
			rates.average++;
		} else if (movie.rate === 4) {
			rates.good++;
		} else if (movie.rate === 5) {
			rates.perfect++;
		}
	});
};

const calulateGenresSum = (watched) => {
	watched.forEach((ele) => {
		ele.genres.forEach((genre) => {
			allGenres.forEach((obj) => {
				if (obj.name === genre.name) {
					obj.count++;
				}
			});
		});
	});
};

const Stats = ({ watched }) => {
	useEffect(
		() => {
			rates = {
				bad: 0,
				average: 0,
				good: 0,
				perfect: 0
			};

			calculateRatedMovies(watched);
			calulateGenresSum(watched);
			let genreCategories = [];
			let genreData = [];
			allGenres.forEach((ele) => {
				genreCategories.push(ele.name);
				genreData.push(ele.count);
			});

			SetGenresChart({
				options: {
					chart: {
						id: 'basic-bar'
					},
					xasis: {
						categories: [
							'genreCategories',
							'asdasd'
						]
					}
				},
				series: [
					{
						data: genreData
					}
				]
			});

			setChartState({
				series: [
					{
						data: [
							rates.bad,
							rates.average,
							rates.good,
							rates.perfect
						]
					}
				]
			});
		},
		[
			watched
		]
	);

	const [
		rateChart,
		setChartState
	] = useState({
		options: {
			chart: {
				id: 'basic-bar'
			},
			xaxis: {
				categories: [
					'Bad',
					'Average',
					'Good',
					'Perfect'
				]
			},
			yaxis: {
				labels: {
					formatter: function(val) {
						return val;
					}
				}
			}
		},
		series: [
			{
				name: 'Movies rate',
				data: [
					rates.bad,
					rates.average,
					rates.good,
					rates.perfect
				]
			}
		]
	});

	const [
		genresChart,
		SetGenresChart
	] = useState({
		options: {
			chart: {
				id: 'bar'
			},
			xaxis: {
				categories: [
					'Action'
				]
			},
			yaxis: {
				labels: {
					formatter: function(val) {
						return val;
					}
				}
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
					<div className='col-6'>
						<Chart options={rateChart.options} series={rateChart.series} type='bar' width='100%' />
					</div>
					<div className='col-6'>
						<Chart options={this.state.options} series={this.state.series} type='bar' height={400} />
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
