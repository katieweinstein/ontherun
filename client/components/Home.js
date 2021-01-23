import React from 'react'
import {sendAllData} from '../store/data'
import {connect} from 'react-redux'
import {PieChart} from './index'

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
    let runs = {};
    for (let i = 0; i < columnInfo.length; i++) {
      runs[columnInfo[i].replace(/["]+/g, '')] = [];
    }
    const row = data.split('\n')
    for (let i = 1; i < row.length; i++) {
      const column = row[i].split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/);
      for (let j = 0; j < column.length; j++) {
        const keys = Object.keys(runs);
        runs[keys[j]].push(column[j].replace(/["]+/g, ''));
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
           {Object.keys(this.props.data).length ?
            <PieChart></PieChart>
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
