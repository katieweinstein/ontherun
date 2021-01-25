import React from 'react'
import {connect} from 'react-redux'
import Chart from "react-google-charts";
import Moment from 'moment'

class AreaChart extends React.Component {
  constructor() {
    super();
    this.state = {
      distanceArray: []
    }
    this.formatDistances = this.formatDistances.bind(this);
  }

  componentDidMount() {
    this.formatDistances();
  }

  formatDistances() {
    let distanceData = [['Date', 'Distance']];
    let dates = this.props.data.Date.map((item) => Moment(item).format("L"));
    let distances = this.props.data.Distance.map((item) => parseFloat(item));
    dates = dates.reverse();
    distances = distances.reverse();
    for (let i = 0; i < dates.length; i++) {
      distanceData.push([dates[i], distances[i]]);
    }
    this.setState({
      distanceArray: distanceData,
    })
  }

  render() {
    return (
      <Chart
        className="me-5 mb-4"
        chartType="AreaChart"
        loader={<div>Loading Chart...</div>}
        data={this.state.distanceArray}
        options={{
          title: 'Distances Run',
          hAxis: { title: 'Date (non-linear)'},
          vAxis: { minValue: 0 },
        }}
      />
    )
  }
}

const mapState = (state) => {
  return {
    data: state.data,
  }
}

export default connect(mapState)(AreaChart)
