import Chart from 'react-apexcharts';

const options = {
	labels: ['Income', 'Expense'],
	colors: ['#213ebf', '#FD5E53'],
	chart: {
		width: '50px',
	},
	states: {
		hover: {
			filter: {
				type: 'none',
			},
		},
	},
	legend: {
		show: false,
	},
	dataLabels: {
		enabled: false,
	},
	hover: { mode: null },
	plotOptions: {
		donut: {
			expandOnClick: false,
			donut: {
				labels: {
					show: false,
				},
			},
		},
	},
	fill: {
		colors: ['#213ebf', '#FD5E53'],
	},
	tooltip: {
		enabled: true,
		theme: 'dark',
		style: {
			fontSize: '12px',
			fontFamily: undefined,
			backgroundColor: '#000000',
		},
	},
};

export default function TransactionChartSummary({
	expense = 100,
	income = 100,
}) {
	return (
		<Chart
			options={options}
			series={[income, expense]} //pass the data for the pie chart, 2 data points === two slices in the pie chart where size proportional to value of each
			type="pie"
			width={'100%'}
			height={'100%'}
		/>
	);
}
