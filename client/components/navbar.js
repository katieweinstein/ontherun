import React from 'react'

export default class Navbar extends React.Component {
  constructor() {
    super();
    this.showInfo = this.showInfo.bind(this);
  }

  showInfo() {
    const visibility = document.getElementById('info').style.display;
    console.log(visibility);
    if (visibility === "block") {
      document.getElementById('info').style.display = "none";
    } else {
      document.getElementById('info').style.display = "block";
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          <h1 className="highlight text-center m-2">On The Run</h1>
        </div>
        <div className="text-center">
          <p style={{margin: 0}}>Lifetime running data visualization by Katie Weinstein.</p>
          <button type="button" onClick={this.showInfo} style={{fontSize: 12}} className="btn btn-light m-3">Where is my data going?</button>
        </div>
        <div className="container" id="info" style={{display: "none"}}>
          <span className="text-center">
            <p>Don't worry, your data isn't really going anywhere! We're only storing your data in the browser while you're here.</p>
            <p>If you close this window or refresh the page, your data will disappear. So nobody will ever know about that one time when you underestimated how steep that hill was. Or when that easy run actually ended up being really hard. Or when you paused your watch for 10 minutes to pet a cute dog.</p>
          </span>
        </div>
      </div>
    )
  }
}
