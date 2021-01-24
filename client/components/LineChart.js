import React from 'react'
import {connect} from 'react-redux'
import Chart from "react-google-charts";
import {sendCadenceAndPace} from '../store/cadencePace'

class LineChart extends React.Component {
  constructor() {
    super();
    this.state = {
      cadenceArray: [],
      paceArray: []
    }
    this.getCadenceAndPace = this.getCadenceAndPace.bind(this);
    this.convertToData = this.convertToData.bind(this);
  }

  async componentDidMount() {
    await this.getCadenceAndPace();
    await this.convertToData();
  }

  getCadenceAndPace() {
    const paceArray = this.props.data['Avg Pace'];
    const cadenceArray = this.props.data['Avg Run Cadence'];
    for (let i = 0; i < paceArray.length; i++) {
      if (paceArray[i] === '--' || cadenceArray[i] === '--') {
        paceArray.splice(i, 1);
        cadenceArray.splice(i, 1);
        i--;
      } else {
        const cadenceNum = parseInt(cadenceArray[i]);
        cadenceArray.splice(i, 1, cadenceNum);
        const paceNum = parseInt(paceArray[i]);
        paceArray.splice(i, 1, paceNum);
      }
    }
    this.setState({
      cadenceArray: cadenceArray.reverse(),
      paceArray: paceArray.reverse()
    })
  }

  convertToData() {
    const lineChartData = [];
    lineChartData.push(['Runs (Oldest to Newest)', 'Average Cadence', 'Average Pace']);
    for (let i = 0; i < this.state.cadenceArray.length; i++) {
      lineChartData.push([i, this.state.cadenceArray[i], this.state.paceArray[i]]);
    }
    this.props.sendCadenceAndPace(lineChartData);
  }

  render() {
    return (
      // <div></div>
      <Chart
        width={'600px'}
        height={'400px'}
        chartType="Line"
        loader={<div>Loading Chart</div>}
        data={this.props.cadencePace}
        options={{
          chart: {
            title:
              'Average Cadence Per Run vs Average Pace Per Run',
          },
          series: {
            0: { axis: 'Temps' },
            1: { axis: 'Daylight' },
          },
          axes: {
            // Adds labels to each axis; they don't have to match the axis names.
            y: {
              Cadence: { label: 'Avg Cadence' },
              Pace: { label: 'Avg Pace' },
            },
          },
        }}
      />
    )
  }
}

const mapState = (state) => {
  return {
    data: state.data,
    cadencePace: state.cadencePace
  }
}

const mapDispatch = (dispatch) => {
  return {
    sendCadenceAndPace: (cadencePace) => dispatch(sendCadenceAndPace(cadencePace)),
  }
}

export default connect(mapState, mapDispatch)(LineChart)
