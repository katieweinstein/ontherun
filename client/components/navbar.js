import React from 'react'
import {Link} from 'react-router-dom'

export default class Navbar extends React.Component {
  render() {
    return (
      <div>
        <h1 className="text-center m-2">On The Run</h1>
        <p className="text-center">Lifetime running data visualization by Katie Weinstein.</p>
        <nav></nav>
      </div>
    )
  }
}
