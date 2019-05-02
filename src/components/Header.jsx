import React from 'react';
import {Link} from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const Header = (props) => {
    return (
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h4"
              style={{ borderRight: '0.04em solid grey', paddingRight: '0.5em' }}>
              Trece Sauces - Calendario de Reservas
            </Typography>
            <div style={{ padding: '0.5em' }}>
              <Button component={Link} to="/bookings">Reservas</Button>
              <Button component={Link} to="/clients">Clientes</Button>
              <Button component={Link} to="/calendar">Calendario</Button>
            </div>
          </Toolbar>
        </AppBar>
    )
}

export default Header;