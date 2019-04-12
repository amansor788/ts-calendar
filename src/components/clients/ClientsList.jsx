import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import CustomTableCell from '../CustomTableCell';
import * as clientActions from '../../actions/ClientActions';
import TableItemMenu from '../../components/TableItemMenu';
import ModalForm from '../ModalForm';
import ClientForm from './ClientForm';

// import _ from 'lodash';
// import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
// import { connect } from 'react-redux';
// import ClientForm from './ClientForm';
// import TableItemMenu from '../../components/TableItemMenu'; 

const styles = {
  addButton: {
    position: 'fixed',
    bottom: '10px',
    right: '10px',
  },
};

class ClientsList extends React.Component {

  state = {
    newOpen: false,
    editOpen: false,
    deleteOpen: false,
  }

  componentDidMount() {
    this.props.clientActions.fetch();
  }

  onNew = e => {
    e.stopPropagation();
    this.setState({ newOpen: true });
  }

  onNewCancel = e => {
    e.stopPropagation();
    this.setState({ newOpen: false });
  }

  onNewConfirm = (formValues) => {
    this.props.clientActions.addClient(formValues);
    this.setState({ newOpen: false });
  }

  handleDeleteConfirm = clientId => {
    this.props.clientActions.removeClient(clientId);
    this.setState({ deleteOpen: false });
  }

  render(){
    const {newOpen} = this.state;

    const newFormDialog = newOpen ? 
    <ModalForm
        open={newOpen}
        form={ClientForm}
        title="Nuevo Cliente"
        onConfirm={this.onNewConfirm}
        OnCancel={this.onNewCancel}
      />
    : null;

    return (
      <div>
      <Table>
        <TableHead>
          <TableRow>            
            <CustomTableCell>Apellidos</CustomTableCell>
            <CustomTableCell>Nombre</CustomTableCell>
            <CustomTableCell>Origen</CustomTableCell>
            <CustomTableCell>Contacto</CustomTableCell>
            <CustomTableCell>Acciones</CustomTableCell>                       
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.clients.map(client => (
            <TableRow key={client.id} style={styles.row}>
              <CustomTableCell component="th" scope="row">{client.lastname}</CustomTableCell>
              <CustomTableCell>{client.firstname}</CustomTableCell>
              <CustomTableCell>{client.condition}</CustomTableCell>
              <CustomTableCell>{client.email}</CustomTableCell>
              <CustomTableCell> 
                <TableItemMenu
                  model={client}
                  actions={this.props.clientActions}
                  onDeleteConfirm={this.handleDeleteConfirm}
                  onEditConfirm={this.handleEditConfirm} />
              </CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Fab color="primary" size="small" aria-label="Add" 
        style={styles.addButton} onClick={this.onNew}>
        <AddIcon />
        {newFormDialog}  
      </Fab>
  </div>)
  }
}

export default connect(
  store => ({
    clients: Object.values(store.clients),
  }),
  dispatch => ({
    clientActions: bindActionCreators(clientActions, dispatch),
  })
)(ClientsList);
