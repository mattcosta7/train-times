/**
 * Created by caimingxun on 2016/10/16.
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHeaderColumn
} from "material-ui/Table";
import MyTableRow from '../components/table-row'
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
            if (a.station_id > b.station_id) return 1;
            else if (a.station_id < b.station_id) return -1;
            return new Date(a.expected_arrival) - new Date(b.expected_arrival);
          })
        })
      )
      .catch(e => console.log(e));
  };

  render() {
    const now = new Date();
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Line</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Minutes Until</TableHeaderColumn>
            <TableHeaderColumn>Expected Time</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {this.state.data.map(slot => (
            <MyTableRow key={`${slot.id}-${slot.expected_arrival}`} line={slot.line} station_name={slot.station_name} expected_arrival={slot.expected_arrival} now={now} />
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default HomePage;
