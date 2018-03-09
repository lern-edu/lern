// Libs
import React from 'react';
import _ from 'lodash';
import Chart from 'chart.js';
import PropTypes from 'prop-types';

class StudentReportChart extends React.Component {

  // Lifecycle

  componentDidMount() {
    const { childrens } = this.props;
    const { chart } = this.refs;

    const orderedReports = _.orderBy(childrens, ['name']);

    const node = new Chart(chart, {
      type: 'doughnut',
      data: {
        labels: _.map(orderedReports, 'name'),
        datasets: [
          {
            label: 'Colors',
            data: _.map(orderedReports, 'score'),
            backgroundColor: _.map(orderedReports, (report) => (report.color || this.getRandomColor())),
          },
        ],
      },
    });
  };

  // Util

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    const color = '#';
    for (let i = 0; i < 6; i++)
      color += letters[Math.floor(Math.random() * 16)];
    return color;
  }

  // Render

  render() {
    return <canvas ref='chart' width={300} height={300} />;
  };
};

StudentReportChart.propTypes = {
  childrens: PropTypes.array.isRequired,
};

export default StudentReportChart;
