import React from 'react'
import {connect} from 'react-redux'
import Moment from 'moment'

class Statistics extends React.Component {
  constructor() {
    super();
    this.state = {
      firstDate: null,
      totalMiles: null,
      runCount: '',
    }
    this.getStatisticData = this.getStatisticData.bind(this);
  }

  componentDidMount() {
    this.getStatisticData();
  }

  getStatisticData() {
    const dateLength = this.props.data.Date.length;
    const firstDate = this.props.data.Date[dateLength - 1];
    const totalMiles = this.props.data.Distance.reduce((total, num) => {return total + parseFloat(num)}, 0);
    const runCount = this.props.data['Activity Type'].filter((item) => item.includes("Running"));
    this.setState({
      firstDate: Moment(firstDate).format("LL"),
      totalMiles: totalMiles.toFixed(2),
      runCount: runCount.length,
    })
  }

  render() {
    return (
      <div>
        <h3 className="text-center">Since {this.state.firstDate}, you've run {this.state.totalMiles} miles over {this.state.runCount} runs.</h3>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    data: state.data,
  }
}

export default connect(mapState)(Statistics)
