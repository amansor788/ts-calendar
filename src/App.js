import React, { Component } from 'react';
//import logo from './logo.svg';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/lightBlue';
import { Route } from 'react-router-dom';

import Header from './components/Header';
 import BookingsList from './components/bookings/BookingsList';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  topbar: {
    display: 'flex',
    width: '100%',
    toolbar: {
      width: '100%',
    }
  },
  main: {
    display: 'flex',
    width: '100%',
  },
};

const theme = createMuiTheme({
    palette: {
      primary: blue
    },
    typography: {
      useNextVariants: true,
    }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div id="root" style={styles.root}>
          <Header/>
          {/* <HeaderOld styles={styles}/> */}
          <div style={styles.main}>
            <Route path="/bookings" component={BookingsList} />
            {/* <Route path="/clients" component={ClientsList} /> */}
          </div>
        </div>
    </MuiThemeProvider>
    );
  }
}

export default App;
