import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/lightBlue';

import Header from './components/Header';
import BookingsList from './components/bookings/BookingsList';

// const styles = {
//   root: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   topbar: {
//     display: 'flex',
//     width: '100%',
//     toolbar: {
//       width: '100%',
//     }
//   },
//   main: {
//     display: 'flex',
//     width: '100%',
//   },
// };

const theme = createMuiTheme({
    palette: {
      primary: blue
    },
    typography: {
      useNextVariants: true,
      h4: {
        fontStyle: 'italic',
      },
      button: {
        fontSize: 12,
      },
    },
    
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div id="root">
          <Header/>
          {/* <HeaderOld styles={styles}/> */}
          <div>
            <Route path="/bookings" component={BookingsList} />
            {/* <Route path="/clients" component={ClientsList} /> */}
          </div>
        </div>
    </MuiThemeProvider>
    );
  }
}

export default App;
