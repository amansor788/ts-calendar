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
          <Typography variant="h4" color="inherit">
            Trece Sauces - Calendario de Reservasss
          </Typography>
          <Button color="inherit" component={Link} to="/bookings">Reservas</Button>
          <Button color="inherit" component={Link} to="/clients">Clientes</Button>
        </Toolbar>
      </AppBar>
    )
}

export default Header;