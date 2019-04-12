import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import { fetch as fetchCabins } from '../../actions/CabinActions';

class BookingForm extends React.Component {

    componentDidMount() {
        this.props.fetchCabins();
    }

    renderTextField(formProps) {
        return (
            <React.Fragment>
                <TextField
                    label={formProps.label}
                    type={formProps.type}
                    {...formProps.input}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                    autoComplete="off"
                />
                <div style={{color: 'red'}}>
                    {formProps.meta.touched && formProps.meta.error ? formProps.meta.error : ''}
                </div>
            </React.Fragment>
        )
    }

    renderCheckBox(formProps) {
        return (
            <FormControlLabel
                control={
                    <Checkbox
                        checked={formProps.input.value === 'true'}
                        {...formProps.input}
                    />
                }
                label={formProps.label}
            />
        )
    }

    renderSelect = (formProps) => {
        const { cabins } = this.props;
        return (
            <React.Fragment>
                <InputLabel htmlFor="cabinId">Cabana</InputLabel>
                <Select
                    {...formProps.input}
                    displayEmpty={true}
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
                <div style={{color: 'red'}}>
                    {formProps.meta.touched && formProps.meta.error ? formProps.meta.error : ''}
                </div>
            </React.Fragment>
        )
    }

    render() {
        const { handleSubmit, onSubmit } = this.props;

        return (
            <form id="bookingFormId" onSubmit={handleSubmit(onSubmit)} style={{fontSize: '1.20rem'}}>
                <div style={{float: 'left', width: '33%',  height:'100%'}}>
                    <Field name="client" label="Cliente" component={this.renderTextField} type="text" />
                    <Field name="total" label="Total" component={this.renderTextField} type="text" />
                    <Field name="deposited" label="Confirmado" component={this.renderCheckBox}
                    format={val => { return (val === 1 ? 'true' : 'false') }}
                    normalize={val => {return (val ? 1 : 0)}} />
                <FormControl style={{minWidth: '100%', fontSize: '1.20rem'}}>
                    <Field name="cabin" label="Cabana" component={this.renderSelect}/>
                </FormControl>
                </div>
                <div style={{display: 'inline-block', width: '34%',  height:'100%'}}>
                    <Field name="since" label="Desde" component={this.renderTextField} type="date" />
                    <Field name="deposit" label="Reserva" component={this.renderTextField} type="text" />
                    <Field name="needs_cradle" label="Cuna" component={this.renderCheckBox}
                    format={val => { return (val === 1 ? 'true' : 'false') }} 
                    normalize={val => {return (val ? 1 : 0)}} />
                </div>
                <div style={{float: 'right', width: '33%',  height:'100%'}}>
                    <Field name="until" label="Hasta" component={this.renderTextField} type="date" />
                    <Field name="pax" label="Pax" component={this.renderTextField} type="text" />
                    <Field name="has_dog" label="Perro" component={this.renderCheckBox}
                    format={val => { return (val === true ? 'true' : 'false') }} />
                </div>
            </form>
        )
    }
}

const validate = (formValues) => {
    const errors = {};

    if (!formValues.client){
        errors.client = 'Ingrese cliente';
    }
    if (!formValues.since){
        errors.since = 'Ingrese fecha desde';
    }
    if (!formValues.until){
        errors.until = 'Ingrese fecha hasta';
    }
    if (!formValues.total){
        errors.total = 'Ingrese total';
    }
    if (!formValues.deposit){
        errors.deposit = 'Ingrese reserva';
    }
    if (!formValues.pax){
        errors.pax = 'Ingrese pax';
    }
    if (!formValues.cabin){
        errors.cabin = 'Seleccione cabana';
    }


    return errors;
}

const mapStateToProps = (state) => {
    return {
        cabins: Object.values(state.cabins),
    }
};

BookingForm = reduxForm({
    form: 'bookingForm',
    validate
})(BookingForm)

export default connect(mapStateToProps, { fetchCabins })(BookingForm)