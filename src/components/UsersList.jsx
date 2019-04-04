import React from 'react';
import { Table } from 'react-bootstrap';

class UsersList extends React.Component {
  render() {
    return (
      <Table responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
            {this.props.bookings.map((booking, i) => {
              return (
                <tr key={i}>
                  <td>{client.client}</td>
                  <td>{client.since}</td>
                  <td>{client.until}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    );
  }
}

export default ClientsList;
