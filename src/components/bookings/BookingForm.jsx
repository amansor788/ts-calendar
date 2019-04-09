import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { fetch as fetchCabins } from '../../actions/CabinActions';

class BookingForm extends React.Component {

    componentDidMount() {
        this.props.fetchCabins();
    }

    renderTextField(formProps) {
        return (
            <TextField
                label={formProps.label}
                type={formProps.type}
                {...formProps.input}
                InputLabelProps={{
                    shrink: true,
                }}
                margin="normal"
            />
        )
    }

    renderCheckBox(formProps) {
        return (
            <FormControlLabel
                control={
                    <Checkbox
                        checked={formProps.input.value === 'true'}
                        {...formProps.input}
                    // onChange={this.handleChange}
                    />
                }
                label={formProps.label}
            />
        )
    }

    renderSelect = (formProps) => {
        const { cabins } = this.props;
        return (
            <Select
                {...formProps.input}
                // value={this.state.cabin}
                // onChange={this.onSelectChange}
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
        )
    }

    onSubmit = formValues => {
        //console.log('formValues', formValues);
        this.props.onSubmit(formValues);
        // e.preventDefault();
        // const { model } = this.props;
    
        // if (model) {
        //   this.props.actions.updateBooking(model.id, { ...this.state });
        // } else {
        //   this.props.actions.addBooking({ ...this.state });
        // }
    
        // this.props.afterSubmit();
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form id="bookingFormId" onSubmit={handleSubmit(this.onSubmit)}>
                <Field name="client" label="Cliente" component={this.renderTextField} type="text" />
                <Field name="since" label="Desde" component={this.renderTextField} type="date" />
                <Field name="until" label="Hasta" component={this.renderTextField} type="date" />
                <Field name="total" label="Total" component={this.renderTextField} type="text" />
                <Field name="deposit" label="Reserva" component={this.renderTextField} type="text" />
                <Field name="pax" label="Pax" component={this.renderTextField} type="text" />
                <Field name="deposited" label="Confirmado" component={this.renderCheckBox}
                    format={val => { return (val === 1 ? 'true' : 'false') }}
                    normalize={val => {return (val ? 1 : 0)}} />
                <Field name="needs_cradle" label="Cuna" component={this.renderCheckBox}
                    format={val => { return (val === 1 ? 'true' : 'false') }} 
                    normalize={val => {return (val ? 1 : 0)}} />
                <Field name="has_dog" label="Perro" component={this.renderCheckBox}
                    format={val => { return (val === true ? 'true' : 'false') }} />
                <Field name="cabin" label="Cabana" component={this.renderSelect}/>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cabins: Object.values(state.cabins),
    }
};

BookingForm = reduxForm({
    form: 'bookingForm',
})(BookingForm)

export default connect(mapStateToProps, { fetchCabins })(BookingForm)