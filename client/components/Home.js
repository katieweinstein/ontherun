import React from 'react'
import {sendAllData} from '../store/data'
import {connect} from 'react-redux'
import {PieChart, Statistics, LineChart} from './index'

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

  // This keeps the file handy in state,
  // so that we can send it off to the store via other functions after submit.
  handleFileChange(event) {
    const newFile = event.target.files[0];
    this.setState({
      selectedFile: newFile
    })
  }

  // This will pass the submitted file from state to the read file function.
  handleSubmit(event) {
    event.preventDefault();
    this.readFile(this.state.selectedFile, this.getRunObject);
  }

  // This function reads the file as a string and sends it to getRunObject.
  readFile(file, callback) {
    const reader = new FileReader();
    reader.addEventListener("loadend", function() {
      callback(reader.result);
    });
    reader.readAsText(file);
  }

  // The file will be parsed and sent to the store via dispatch at the end.
  async getRunObject(data) {

    // Create a "runs" object that will hold all of our data as key value pairs,
    // the key being the column header (Time, Distance, Laps, etc),
    // and the value being an array that holds all of the data.
    let runs = {};
    const columnInfo = data.split('\n')[0].split(',');

    // Go through the first row and create keys in the runs object
    for (let i = 0; i < columnInfo.length; i++) {
      runs[columnInfo[i].replace(/["]+/g, '')] = [];
    }

    // Split the data into rows, iterate through all rows (except the first),
    // and store each piece of data in its corresponding array.
    const row = data.split('\n')
    for (let i = 1; i < row.length; i++) {

      // This regex splits each row by commas NOT enclosed in quotations
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
        <div className="container">
          <h3>How to see your data:</h3>
          <div className="row">
            <ol className="col-8">
              <li>Log in to your <a href="https://connect.garmin.com/signin/?service=https%3A%2F%2Fconnect.garmin.com%2Fmodern%2F">Garmin Connect</a> account.</li>
              <li>On the lefthand navbar, click "Activities", and then "All Activities".</li>
              <li>Click on the running man button to filter by runs only.</li>
              <li>Scroll down through your activities until you reach the bottom (or as far as you want!).</li>
              <li>Click the "Export CSV" link in the upper right hand corner underneath your profile picture.</li>
              <li>Upload your CSV!</li>
            </ol>
            <form onSubmit={this.handleSubmit} className="col-3">
              <input type="file" onChange={this.handleFileChange} className="btn btn-outline-secondary mb-3"/>
              <input type="submit" value="See My Data" className="btn btn-outline-secondary mx-auto"/>
            </form>
          </div>
        </div>
        {Object.keys(this.props.data).length ?
          <div className="m-3">
            <Statistics/>
            <div className="container mt-5">
              <div className="row">
                <PieChart className="col"/>
                <LineChart className="col"/>
              </div>
            </div>
          </div>
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
