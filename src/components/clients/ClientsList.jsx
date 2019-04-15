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
import ClientTableItemMenu from './ClientTableItemMenu';
import ModalForm from '../ModalForm';
import ClientForm from './ClientForm';

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

  handleNewConfirm = formValues => {
    this.props.clientActions.addClient(formValues);
    this.setState({ newOpen: false });
  }

  handleEditConfirm = (clientId,formValues) => {
    this.props.clientActions.updateClient(clientId, formValues);
  }

  handleDeleteConfirm = clientId => {
    this.props.clientActions.removeClient(clientId);
  }

  render(){
    const {newOpen} = this.state;

    const newFormDialog = newOpen ? 
    <ModalForm
        open={newOpen}
        form={<ClientForm onSubmit={this.handleNewConfirm}/>}
        title="Nuevo Cliente"
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
                <ClientTableItemMenu
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