import React from 'react'
import { TextField } from '@material-ui/core';

export default function Input(props) {

    const { name, label, value, variant, onChange, error = null, ...other } = props;
    return (
        <TextField
            variant={variant || "outlined"}
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            {...other} //Si exciste una propiedad adicional accedera con el objeto other
            {...(error && { error: true, helperText: error })} //podremos validar nuestro formulario  
        />
    ) 
}
