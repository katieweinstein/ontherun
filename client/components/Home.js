import React from 'react'
import {sendAllData} from '../store/data'
import {connect} from 'react-redux'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryContainer } from 'victory';

// const data = [
//   {quarter: 1, earnings: 13000},
//   {quarter: 2, earnings: 16500},
//   {quarter: 3, earnings: 14250},
//   {quarter: 4, earnings: 19000}
// ];

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedFile: null,
    }
    this.handleFileInput = this.handleFileInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.readFile = this.readFile.bind(this);
  }

  handleFileInput(event) {
    const newFile = event.target.files[0];
    this.setState({
      selectedFile: newFile
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.readFile(this.state.selectedFile, this.props.sendAllData);
    this.setState({
      selectedFile: null
    });
  }

  readFile(file, callback) {
    const reader = new FileReader();
    reader.addEventListener("loadend", function() {
      callback(reader.result);
    });
    reader.readAsText(file);
  }

  render() {
    return (
      <div>
        <h3>Welcome!</h3>
        <form onSubmit={this.handleSubmit}>
          <input type="file" onChange={this.handleFileInput} />
          <input type="submit"/>
        </form>
        <div id="out">{this.props.data || []}</div>
        {/* //   <VictoryChart theme={VictoryTheme.material} domainPadding={20}
        //     containerComponent={<VictoryContainer responsive={false}/>}>
        //     <VictoryAxis
        //       // tickValues specifies both the number of ticks and where
        //       // they are placed on the axis
        //       tickValues={[1, 2, 3, 4]}
        //       tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
        //     />
        //     <VictoryAxis
        //       dependentAxis
        //       // tickFormat specifies how ticks should be displayed
        //       tickFormat={(x) => (`$${x / 1000}k`)}
        //     />
        //     <VictoryBar
        //       data={data}
        //       x="quarter"
        //       y="earnings"
        //     />
        // </VictoryChart> */}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    data: state.data,
  }
}

const mapDispatch = (dispatch) => {
  return {
    sendAllData: (data) => dispatch(sendAllData(data)),
  }
}

export default connect(mapState, mapDispatch)(Home)
