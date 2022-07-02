import React, { useState } from 'react'

export function useForm(getFreshModelObject) {
    //Utilizamos para completar los formularios
    const [values, setValues] = useState(getFreshModelObject());
    //Utilizamos para el formulario y sus validaciones y asi guardar estos errores
    const [errors, setErrors] = useState({});

    //Resuelve el cambio en el formulario
    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    //Establece todos los controles en su estado inicial
    const resetFormControls = () => {
        setValues(getFreshModelObject());
        setErrors({})
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetFormControls
    }
}

