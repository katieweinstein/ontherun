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
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.readFile = this.readFile.bind(this);
    this.getRunObject = this.getRunObject.bind(this);
  }

  handleFileChange(event) {
    const newFile = event.target.files[0];
    this.setState({
      selectedFile: newFile
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.readFile(this.state.selectedFile, this.getRunObject);
  }

  readFile(file, callback) {
    const reader = new FileReader();
    reader.addEventListener("loadend", function() {
      callback(reader.result);
    });
    reader.readAsText(file);
  }

  async getRunObject(data) {
    const columnInfo = data.split('\n')[0].split(',');
    let runs = [];
    for (let i = 0; i < columnInfo.length; i++) {
      runs.push({[columnInfo[i].replace(/["]+/g, '')]: []});
    }
    const rows = data.split('\n')
    for (let i = 1; i < rows.length; i++) {
      const column = rows[i].split(',');
      for (let j = 0; j < column.length; j++) {
        const key = Object.keys(runs[j]);
        runs[j][key].push(column[j].replace(/["]+/g, ''));
      }
    }
    await this.props.sendAllData(runs);
  }

  render() {
    return (
      <div>
        <h3>Welcome!</h3>
        <form onSubmit={this.handleSubmit}>
          <input type="file" onChange={this.handleFileChange}/>
          <input type="submit"/>
        </form>
           {this.props.data.length ?
           this.props.data.map((item) => {
             const key = Object.keys(item)
            return <div>{item[key]}</div>
           })
        //    <VictoryChart theme={VictoryTheme.material} domainPadding={20}
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
        //       data={this.props.data}
        //       x="quarter"
        //       y="earnings"
        //     />
        // </VictoryChart>)
        : <div></div>}
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
