import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

class ClientForm extends React.Component {

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

    render() {
        const { handleSubmit, onSubmit } = this.props;

        return (
            <form id="clientFormId" onSubmit={handleSubmit(onSubmit)} style={{fontSize: '1.20rem'}}>
                <FormControl style={{minWidth: '100%', fontSize: '1.20rem'}}>
                    <Field name="lastname" label="Apellido" component={this.renderTextField} type="text" />
                </FormControl>
                <FormControl style={{minWidth: '100%', fontSize: '1.20rem'}}>
                    <Field name="firstname" label="Nombre" component={this.renderTextField} type="text" />
                </FormControl>
                <FormControl style={{minWidth: '100%', fontSize: '1.20rem'}}>
                    <Field name="condition" label="Origen" component={this.renderTextField} type="text" />
                </FormControl>
                <FormControl style={{minWidth: '100%', fontSize: '1.20rem'}}>
                    <Field name="email" label="Contacto" component={this.renderTextField} type="text" />
                </FormControl>
            </form>
        )
    }
}

const validate = (formValues) => {
    const errors = {};

    if (!formValues.lastname){
        errors.lastname = 'Ingrese apellido';
    }
    if (!formValues.firstname){
        errors.firstname = 'Ingrese nombre';
    }
    if (!formValues.condition){
        errors.condition = 'Ingrese origen';
    }
    if (!formValues.email){
        errors.email = 'Ingrese contacto';
    }

    return errors;
}

ClientForm = reduxForm({
    form: 'clientForm',
    validate
})(ClientForm)

export default ClientForm;