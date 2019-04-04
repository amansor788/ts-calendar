import React from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {fetch} from '../../actions/CabinActions';

class BookingForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      client: '',
      since: new Date(),
      until: new Date(),
      total: '',
      deposit: '',
      deposited: '',
      pax: '',
      needs_cradle: '',
      has_dog: '',
      cabin: '',
    };

    this.state = { ...this.state, ...this.props.model };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSinceDateChange = this.handleSinceDateChange.bind(this);
    this.handleUntilDateChange = this.handleUntilDateChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  componentDidMount() {
    this.props.fetch();
  }

  onSelectChange(event, index, value) {
    this.setState({ cabin: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { model } = this.props;

    if (model) {
      this.props.actions.updateBooking(model.id, { ...this.state });
    } else {
      this.props.actions.addBooking({ ...this.state });
    }

    this.props.afterSubmit();
  }

  handleCancel(e) {
    this.props.afterCancel();
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSinceDateChange(e, date) {
    this.setState({ since: date });
  }

  handleUntilDateChange(e, date) {
    this.setState({ until: date });
  }

  render() {
    const { cabins } = this.props;

    const actions = [
      // <FlatButton
      //   key="cancel"
      //   label="Cancelar"
      //   primary
      //   onTouchTap={this.handleCancel}
      // />,
      // <FlatButton
      //   key="save"
      //   label="Guardar"
      //   primary
      //   onTouchTap={this.handleSubmit}
      // />,
    ];

    return (
      
      <form onSubmit={this.handleSubmit}>
        <TextField
          id="client"
          label="Cliente"
          // className={/classes.textField}
          value={this.state.client}
          onChange={this.handleChange}
          margin="normal"
        />
        <TextField
          id="since"
          label="Desde"
          type="date"
          value={this.state.since}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={this.handleSinceDateChange}
        />
        {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            margin="normal"
            label="Desde"
            value={this.state.since}
            onChange={this.handleSinceDateChange}
          />
        </MuiPickersUtilsProvider> */}
 
        <TextField
          id="until"
          label="Hasta"
          type="date"
          value={this.state.until}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={this.handleUntilDateChange}
        />

        <TextField
          id="total"
          label="Total"
          // className={/classes.textField}
          value={this.state.total}
          onChange={this.handleChange}
          margin="normal"
        />
        <TextField
          id="deposit"
          label="Reserva"
          // className={/classes.textField}
          value={this.state.deposit}
          onChange={this.handleChange}
          margin="normal"
        />
         <FormControlLabel
          control={
            <Checkbox
              name="deposited"
              checked={!!this.state.deposited}
              onChange={this.handleChange}
            />}
          label="Depositado"
        />
        <TextField
          id="pax"
          label="PAX"
          // className={/classes.textField}
          value={this.state.pax}
          onChange={this.handleChange}
          margin="normal"
        />
         <FormControlLabel
          control={
            <Checkbox
            name="needs_cradle"
            checked={!!this.state.needs_cradle}
            onChange={this.handleChange}
          />}
            label="Cuna"
        />
         <FormControlLabel
          control={
            <Checkbox
            name="has_dog"
            label="Perro?"
            checked={!!this.state.has_dog}
            onChange={this.handleChange}
            />}
              label="Perro"
        />
        <InputLabel htmlFor="cabinId">Cabaña</InputLabel>
          <Select
            value={this.state.cabin}
            onChange={this.onSelectChange}
            inputProps={{
              name: 'cabin',
              id: 'cabinId',
            }}
          >
            {cabins.map(
              cabin => <MenuItem
                key={cabin.id}
                value={cabin.id}
              >{cabin.name}</MenuItem>
            )}
          </Select>
        {actions}
       </form>
    );
  }
}

BookingForm.propTypes = {
  model: PropTypes.object,
  actions: PropTypes.object,
  cabins: PropTypes.array,
  cabinActions: PropTypes.object,
};

// export default connect(
//   store => ({
//     cabins: store.cabins,
//   })
// )(BookingForm);


///////////////////////////////////
const mapStateToProps = (state) => {
  return {
    cabins: state.cabins,
  };
};

export default connect(
  mapStateToProps,
  {fetch}
)(BookingForm);

