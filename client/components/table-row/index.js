import React from 'react';
import {
  TableRow,
  TableRowColumn
} from "material-ui/Table";

const diffMins = diffMs => Math.round(((diffMs % 86400000) % 3600000) / 60000);

export default class MyTableRow extends React.PureComponent {
  render() {
    const expected_arrival = new Date(this.props.expected_arrival);
    return (
      <TableRow selectable={false}>
        <TableRowColumn>{this.props.line}</TableRowColumn>
        <TableRowColumn>{this.props.station_name}</TableRowColumn>
        <TableRowColumn>
          {diffMins(expected_arrival - this.props.now)} mins away
        </TableRowColumn>
        <TableRowColumn>
          {expected_arrival.toLocaleString()}
        </TableRowColumn>
      </TableRow>
    )
  }
  
}