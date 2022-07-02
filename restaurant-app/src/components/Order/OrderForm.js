import React, { useState, useEffect } from 'react'
import Form from "../../layouts/Form";
import { Grid, InputAdornment, makeStyles, ButtonGroup, Button as MuiButton } from '@material-ui/core'; //funcion de estilos de Material UI
import { Input, Select, Button } from "../../controls";
import ReplayIcon from '@material-ui/icons/Replay';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import ReorderIcon from '@material-ui/icons/Reorder';
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import { roundTo2DecimalPoint } from "../../utils";
import Popup from '../../layouts/Popup';
import OrderList from './OrderList';
import Notification from "../../layouts/Notification";
 

//Metodo de Pago
const pMethods = [
    { id: 'none', title: 'Seleccionar' },
    { id: 'Cash', title: 'Efectivo' },
    { id: 'Card', title: 'Tarjeta' },
]

//Definimos la funcion de estilos 
const useStyles = makeStyles(theme => ({
    adornmentText: {
        '& .MuiTypography-root': {
            color: '#00b849',
            fontWeight: 'bolder',
            fontSize: '1.5em'
        }
    },
    submitButtonGroup: {
        backgroundColor: '#53cd75',
        color: '#000',
        margin: theme.spacing(4),
        '& .MuiButton-label': {
            textTransform: 'none'
        },
        '&:hover': {
            backgroundColor: '#a6e5a7',
        }
    }
}))

export default function OrderForm(props) {
    
    //Utilizamos "props" para que se puedan obtener los datos desde index.
    const { values, setValues, errors, setErrors,
        handleInputChange, resetFormControls } = props;
    
    //Llamamos a la funcion de estilos    
    const classes = useStyles();
    
    //Lista de clientes
    const [customerList, setCustomerList] = useState([]);
    //Lista de pedidos -> Inicializa en falso-> mostrar o ocultar la ventana emergente
    const [orderListVisibility, setOrderListVisibility] = useState(false);
    //Actualizar orden
    const [orderId, setOrderId] = useState(0);
    //Notificacion
    const [notify, setNotify] = useState({ isOpen: false })

    //Creamos la funcion para la devolucion de la llamada
    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.CUSTOMER).fetchAll()
            .then(res => {
                //Variable para acceder a la lista de clientes
                let customerList = res.data.map(item => ({
                    id: item.customerID,
                    title: item.customerName
                    //La funcion de devolucion de llamada nos devuelve el id, title
                }));
                customerList = [{ id: 0, title: 'Seleccionar' }].concat(customerList);
                setCustomerList(customerList);
            })
            .catch(err => console.log(err))
    }, [])

//Calcular el Pago Total
//tempTotal es una variable temporal para el calculo del total
    useEffect(() => {
        let gTotal = values.orderDetails.reduce((tempTotal, item) => {
            return tempTotal + (item.quantity * item.foodItemPrice);
        }, 0);
        setValues({
            ...values,
            gTotal: roundTo2DecimalPoint(gTotal)
        })

    }, [JSON.stringify(values.orderDetails)]);//método convierte un objeto o valor de JavaScript en una cadena JSON

    //Funcion para Rellenar los campos cuando quieras modificar la orden
    useEffect(() => {
        if (orderId == 0) resetFormControls() // si es igual a 0 se resetea el formulario
        else {
            //Pasanmos la orden -> realiza busqueda mediantID
            createAPIEndpoint(ENDPIONTS.ORDER).fetchById(orderId)
                .then(res => {
                    setValues(res.data);
                    setErrors({});
                })
                .catch(err => console.log(err))
        }
    }, [orderId]);

    //Funcion para validar
    const validateForm = () => {
        let temp = {};
        //Creamos objetos temporales para guardar el error de validacion
        temp.customerId = values.customerId != 0 ? "" : "Este campo es requerido.";//Si el CustomerID es deiferente de 0 si se ha seleccionado un Cliente
        temp.pMethod = values.pMethod != "none" ? "" : "Este campo es requerido.";//Si el metodo de pago es diferente al "none" que es por defecto-si ha sido seleccionado un metodo de pago
        temp.orderDetails = values.orderDetails.length != 0 ? "" : "Este campo es requerido.";//Si en el detellae de la orden es diferente de 0-quiere decir que si ha seleccionado al menos un alimento
        setErrors({ ...temp });
        return Object.values(temp).every(x => x === "");
    }

    //Funcion de nuestro boton reiniciar la orden
    const resetForm = () => {
        resetFormControls();
        setOrderId(0);
    }

    //Funcion para enviar la orden
    const submitOrder = e => {
        e.preventDefault();
        if (validateForm()) {
            if (values.orderMasterId == 0) {
                //Vamos a publicar la solicitud de creacion de orden
                createAPIEndpoint(ENDPIONTS.ORDER).create(values)
                    .then(res => {
                        resetFormControls();
                        //Mostrara esta notificacion
                        setNotify({isOpen:true, message:'Se creo una nueva orden.'});
                    })
                    .catch(err => console.log(err));
            }
            else { //Hacer la actualizacion de la orden 
                createAPIEndpoint(ENDPIONTS.ORDER).update(values.orderMasterId, values)
                    .then(res => {
                        setOrderId(0);
                        //Mostrara esta notificacion
                        setNotify({isOpen:true, message:'La orden ha sido actualizada.'});
                    })
                    .catch(err => console.log(err));
            }
        }

    }

    //Dentro de esta funcion establecemos la lista de orden -> en un valor de true
    const openListOfOrders = () => {
        setOrderListVisibility(true);
    }
//Formulario
    return (
        <>
            <Form onSubmit={submitOrder}>
                <Grid container>
                    <Grid item xs={6}>
                        <Input
                            disabled
                            label="Numero de Orden"
                            name="orderNumber"
                            value={values.orderNumber}
                            InputProps={{
                                startAdornment: <InputAdornment
                                    className={classes.adornmentText}
                                    position="start">#</InputAdornment>
                            }}
                        />
                        <Select
                            label="Cliente"
                            name="customerId"
                            value={values.customerId}
                            onChange={handleInputChange}
                            options={customerList} //Objeto de estado de lista de clientes
                            error={errors.customerId}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Select
                            label="Metodo de Pago"
                            name="pMethod"
                            value={values.pMethod}
                            onChange={handleInputChange}
                            options={pMethods}
                            error={errors.pMethod}
                        />
                        <Input
                            disabled
                            label="Valor Total"
                            name="gTotal"
                            value={values.gTotal}
                            InputProps={{
                                startAdornment: <InputAdornment
                                    className={classes.adornmentText}
                                    position="start">$</InputAdornment>
                            }}
                        />
                        <ButtonGroup className={classes.submitButtonGroup}>
                            <MuiButton
                                size="large"
                                endIcon={<RestaurantMenuIcon />}
                                type="submit">Ordenar</MuiButton>
                            <MuiButton
                                size="small"
                                onClick={resetForm}
                                startIcon={<ReplayIcon />}
                            />

                        </ButtonGroup>
                        <Button
                            size="large"
                            onClick={openListOfOrders}
                            startIcon={<ReorderIcon />}
                        >Ordenes</Button>
                    </Grid>
                </Grid>
            </Form>
            <Popup
                title="Lista de Ordenes"
                openPopup={orderListVisibility}
                setOpenPopup={setOrderListVisibility}>
                <OrderList
                    {...{ setOrderId, setOrderListVisibility,resetFormControls,setNotify }} />
            </Popup> 
            <Notification
                {...{ notify, setNotify }} />
        </>
    )
}
