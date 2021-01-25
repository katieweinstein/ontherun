import React from 'react'
import {connect} from 'react-redux'
import {mostCommonDistance} from '../functions'

class DistanceStats extends React.Component {
  constructor() {
    super();
    this.state = {
      longestRun: '',
      mostCommon: ''
    }
    this.getDistanceStats = this.getDistanceStats.bind(this);
  }

  componentDidMount() {
    this.getDistanceStats();
  }

  getDistanceStats() {
    const longestRun = this.props.data.Distance.reduce((a, b) => Math.max(a, b));
    const distances = this.props.data.Distance.map((item) => Math.round(item));
    const mostCommon = mostCommonDistance(distances);
    this.setState({
      longestRun: longestRun,
      mostCommon: mostCommon,
    })
  }

  render() {
    return (
      <div className="text-center distanceStats">
        <h3>Your longest run was {this.state.longestRun} miles, but your favorite distance was {this.state.mostCommon} miles.</h3>
        {this.state.longestRun > 26.2 ?
        <p>Wow, you've run a marathon! Congrats! 🎉</p> :
        <div></div>}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    data: state.data,
  }
}

export default connect(mapState)(DistanceStats)
