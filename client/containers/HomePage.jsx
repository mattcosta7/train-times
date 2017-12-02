/**
 * Created by caimingxun on 2016/10/16.
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.fetchFeed();
    this.fetchFeedingInterval = setInterval(this.fetchFeed, 10000);
  }

  componentWillUnmount() {
    if (this.fetchFeedingInterval) clearInterval(this.fetchFeedingInterval);
  }
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  fetchFeed = () => {
    fetch("/schedule")
      .then(response => response.json())
      .then(body =>
        this.setState({
          data: body.sort((a, b) => {
            if (a.id > b.id) return 1;
            else if (b.id > a.id) return -1;
            return new Date(a.expected_arrival) - new Date(b.expected_arrival);
          })
        })
      )
      .catch(e => console.log(e));
  };

  render() {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Line</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Expected Time</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {this.state.data.map((slot, index) => (
            <TableRow key={`${slot.id}-${slot.expected_arrival}`}>
              <TableRowColumn>{slot.line}</TableRowColumn>
              <TableRowColumn>{slot.name}</TableRowColumn>
              <TableRowColumn>{slot.expected_arrival}</TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default HomePage;
