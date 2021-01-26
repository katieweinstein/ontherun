import React from 'react'
import {connect} from 'react-redux'
import Chart from "react-google-charts"
import {sendCadenceAndPace} from '../store/cadencePace'
import {paceToDecimal} from '../functions'

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
        const paceNum = paceToDecimal(paceArray[i]);
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
    lineChartData.push(['Runs (Oldest to Newest)', 'Avg Cadence', 'Avg Pace (Decimal)']);
    for (let i = 0; i < this.state.cadenceArray.length; i++) {
      lineChartData.push([i, this.state.cadenceArray[i], this.state.paceArray[i]]);
    }
    this.props.sendCadenceAndPace(lineChartData);
  }

  render() {
    return (
      <Chart
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
              y: {
                Cadence: { label: 'Avg Cadence' },
                Pace: { label: 'Avg Pace (Decimal)' },
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
