// Libs
import React from 'react';
import _ from 'lodash';
import Chart from 'chart.js';
import PropTypes from 'prop-types';

class StudentReportChart extends React.Component {

  // Lifecycle

  componentDidMount() {
    const { report } = this.props;
    const { chart } = this.refs;

    const orderedTags = _.orderBy(report.childrens, ['name']);

    const node = new Chart(chart, {
      type: 'doughnut',
      data: {
        labels: _.map(orderedTags, 'name'),
        datasets: [
          {
            label: 'Colors',
            data: _.map(orderedTags, 'score'),
            backgroundColor: _.map(orderedTags, 'color'),
          },
        ],
      },
    });
  };

  // Render

  render() {
    const { report } = this.props;

    return <canvas ref='chart' width={300} height={300} />;
  };
};

StudentReportChart.propTypes = {
  report: PropTypes.object.isRequired,
};

export default StudentReportChart;
