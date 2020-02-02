import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';

let rates = {
	bad: 0,
	average: 0,
	good: 0,
	perfect: 0
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
			setChartState({
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
						name: 'Rated Movies',
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
				name: 'series-1',
				data: [
					rates.bad,
					rates.average,
					rates.good,
					rates.perfect
				]
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
					<div className='col-6' />
				</div>
			</div>
		</Fragment>
	);
};

Stats.propTypes = {
	watched: PropTypes.array
};

export default Stats;
