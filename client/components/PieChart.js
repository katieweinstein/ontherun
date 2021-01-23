import React from 'react'
import {connect} from 'react-redux'
import {VictoryPie} from 'victory'
import {sendAllTimes} from '../store/times'

class PieChart extends React.Component {
  constructor() {
    super();
    this.getTime = this.getTime.bind(this);
  }

  componentDidMount() {
    this.getTime();
  }

  async getTime() {
    const timeArray = this.props.data.Time;
    const underThirty = timeArray.filter((item) => item > '00:00:00' && item <= '00:30:00').length;
    const thirtyToHour = timeArray.filter((item) => item > '00:30:00' && item <= '01:00:00').length;
    const hourToNinety = timeArray.filter((item) => item > '01:00:00' && item <= '01:30:00').length;
    const ninetyToTwoHours = timeArray.filter((item) => item > '01:30:00' && item < '02:00:00').length;
    const overTwoHours = timeArray.filter((item) => item > '02:00:00').length;
    await this.props.sendAllTimes([{x: "Under 30 Minutes", y: underThirty}, {x: "Thirty Minutes to an Hour", y: thirtyToHour}, {x: "An Hour to 90 Minutes", y: hourToNinety}, {x: "90 Minutes to 2 Hours", y: ninetyToTwoHours}, {x: "Over 2 Hours", y: overTwoHours}]);
  }

  render() {
   return (
     <div className="chartDiv">
      <VictoryPie
        innerRadius={75}
        labelPosition={({ index }) => index
          ? "centroid"
          : "centroid"
        }
        colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
        data={this.props.timeData}
      />
     </div>
   )
 }
}

const mapState = (state) => {
  return {
    data: state.data,
    timeData: state.times,
  }
}

const mapDispatch = (dispatch) => {
  return {
    sendAllTimes: (times) => dispatch(sendAllTimes(times)),
  }
}

export default connect(mapState, mapDispatch)(PieChart)
