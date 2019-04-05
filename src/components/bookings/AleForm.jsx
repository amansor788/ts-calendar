import React from 'react'
import { Field, reduxForm } from 'redux-form'

import TextField from '@material-ui/core/TextField';

class AleForm extends React.Component {
    renderTextField(formProps){
        //console.log(formProps);
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
  
    render(){
        const { handleSubmit } = this.props
        return (
        <form onSubmit={handleSubmit}>
            <Field name="client" label="Cliente" component={this.renderTextField} type="text"/>
            <Field name="since" label="Desde" component={this.renderTextField} type="date"/>
            <Field name="until" label="Hasta" component={this.renderTextField} type="date"/>
            <Field name="total" label="Total" component={this.renderTextField} type="text"/>
            <Field name="deposit" label="Reserva" component={this.renderTextField} type="text"/>

        </form>)  
    }
}

AleForm = reduxForm({
  // a unique name for the form
  form: 'contact'
})(AleForm)

export default AleForm