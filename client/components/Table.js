import React from 'react'
import {connect} from 'react-redux'

class Table extends React.Component {
  render() {
    return (
      <table>
        <tbody>
          <tr>
            {Object.keys(this.props.data).map((item, i) => {
              return <th key={i}>{item}</th>
            })}
          </tr>
        </tbody>
      </table>
    )
  }
}

const mapState = (state) => {
  return {
    data: state.data,
  }
}

export default connect(mapState)(Table)
