import React from 'react'
import {connect} from 'react-redux'
import {sendAllTimes} from '../store/times'
import Chart from "react-google-charts";

class PieChart extends React.Component {
  constructor() {
    super();
    this.getTime = this.getTime.bind(this);
  }

  // This loads and sorts our pie chart data when the component loads.
  componentDidMount() {
    this.getTime();
  }

  // This organizes our data by time and sends it to the store in the format
  // required by Google Charts.
  async getTime() {
    const timeArray = this.props.data.Time;
    const underThirty = timeArray.filter((item) => item > '00:00:00' && item <= '00:30:00').length;
    const thirtyToHour = timeArray.filter((item) => item > '00:30:00' && item <= '01:00:00').length;
    const hourToNinety = timeArray.filter((item) => item > '01:00:00' && item <= '01:30:00').length;
    const ninetyToTwoHours = timeArray.filter((item) => item > '01:30:00' && item < '02:00:00').length;
    const overTwoHours = timeArray.filter((item) => item > '02:00:00').length;
    await this.props.sendAllTimes([["Duration of Run", "Number of Runs"], ["<30 Minutes", underThirty], ["30-60 Minutes", thirtyToHour], ["60-90 Minutes", hourToNinety], ["90-180 Minutes", ninetyToTwoHours], [">180 Minutes", overTwoHours]]);
  }

  render() {
   return (
      <Chart
        width='100%'
        chartType="PieChart"
        loader={<div>Loading Chart...</div>}
        data={this.props.times}
        options={{
          title: 'Run Durations',
        }}
      />
    )
  }
}

const mapState = (state) => {
  return {
    data: state.data,
    times: state.times,
  }
}

const mapDispatch = (dispatch) => {
  return {
    sendAllTimes: (times) => dispatch(sendAllTimes(times)),
  }
}

export default connect(mapState, mapDispatch)(PieChart)
