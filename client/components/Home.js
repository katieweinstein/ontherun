import React from 'react'
import {sendAllData} from '../store/data'
import {connect} from 'react-redux'
import {PieChart, Statistics, LineChart, DistanceStats, AreaChart, Table} from './index'
import {createRunObject} from '../functions'

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
  // It will also provide error handling for non-csv files.
  handleSubmit(event) {
    event.preventDefault();
    const fileName = this.state.selectedFile.name.split('.');
    const extension = fileName[fileName.length - 1];
    if (extension.toLowerCase() !== 'csv') {
      document.getElementById('invalid').innerText = "Please select a .csv file."
    } else {
      document.getElementById('invalid').innerText = ""
      this.readFile(this.state.selectedFile, this.getRunObject);
    }
  }

  // This function reads the file as a string and sends it to getRunObject.
  readFile(file, callback) {
    const reader = new FileReader();
    reader.addEventListener("loadend", function() {
      callback(reader.result);
    });
    reader.readAsText(file);
  }

  // Data is sent to a function that organizes it into objects.
  // See '/client/functions' line 1.
  async getRunObject(data) {
    const runs = createRunObject(data);
    await this.props.sendAllData(runs);
  }

  render() {
    return (
      <div>
        <div className="container mainPage">
          <div>
            <h3>How to see your data:</h3>
            <div className="row">
              <ol className="col-8">
                <li>Log in to your <a href="https://connect.garmin.com/signin/?service=https%3A%2F%2Fconnect.garmin.com%2Fmodern%2F" target="_blank" rel="noreferrer noopener">Garmin Connect</a> account.</li>
                <li>On the lefthand navbar, click "Activities", and then "All Activities".</li>
                <li>Click on the running man button on the right hand side to filter by runs only.</li>
                <li>Scroll down through your activities until you reach the bottom (or as far as you want!).</li>
                <li>Click the "Export CSV" link in the upper right hand corner underneath your profile picture.</li>
                <li>Upload your CSV!</li>
              </ol>
              <form onSubmit={this.handleSubmit} className="col-3 me-3">
                <input type="file" onChange={this.handleFileChange} className="btn btn-outline-light mb-3"/>
                <input type="submit" value="See My Data" className="btn btn-outline-light mx-auto"/>
                <div id="invalid"></div>
              </form>
            </div>
          </div>
        </div>
        {Object.keys(this.props.data).length ?
          <div className="m-3 p-3">
            <Statistics/>
            <div className="row mt-5 mb-4">
              <div className="col-7 mb-3">
                <PieChart />
              </div>
              <div className="col-4 mb-3">
                <DistanceStats/>
              </div>
            </div>
            <AreaChart />
            <LineChart />
            <Table />
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
