import React from 'react'
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '90%',
            margin: theme.spacing(1) //1 espaciado equivale a 8 pixeles
        }
    }
}))

// Atravez de los props podemos pasar informacion adicional
export default function Form(props) {
    const classes = useStyles();
    const { children, ...other } = props;

//Aplicamos la regla con el objeto raiz
    return (
        <form className={classes.root} noValidate autoComplete="off" {...other}>
            {children}
        </form>
    )
}
