import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import Home from "./containers/HomePage";
class Index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>Astorian Train Times</title>
          <link rel="stylesheet" href="css/base.css" />
          <script
            dangerouslySetInnerHTML={{ __html: this.props.initialState }}
          />
        </head>
        <body>
          <Home />
          <script src="scripts/polyfill.js" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.min.js" />
          <script src="scripts/bundle.js" />
        </body>
      </html>
    );
  }
}

var IndexState = function(state) {
  var stateJSON = JSON.stringify(state)
    .replace(/<\/script/g, "<\\/script")
    .replace(/<!--/g, "<\\!--");
  return {
    initialState: "window.__INITIAL_STATE__ = " + stateJSON
  };
};

export default connect(IndexState)(Index);
