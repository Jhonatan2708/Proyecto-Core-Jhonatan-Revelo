import React, { useState, useEffect } from 'react'
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import Table from "../../layouts/Table";
import { TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import DeleteOutlineTwoToneIcon from '@material-ui/icons/DeleteOutlineTwoTone';

export default function OrderList(props) {

    const { setOrderId, setOrderListVisibility, resetFormControls, setNotify } = props;

    const [orderList, setOrderList] = useState([]);

    //Funcion para obtener un listado de las ordenes
    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.ORDER).fetchAll() 
            .then(res => {
                setOrderList(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    //Funcion para Actualizar -> solo debemos establecer el orderId
    const showForUpdate = id => {
        setOrderId(id);
        //Valor falso para cerrar el popup
        setOrderListVisibility(false);
    }

    //Funcion Eliminar la orden
    const deleteOrder = id => {
        if (window.confirm('¿Estás segura de eliminar esta orden?')) {
            createAPIEndpoint(ENDPIONTS.ORDER).delete(id) //Llamamos al metodo eliminar -> pasando el ID
                .then(res => {
                    setOrderListVisibility(false);
                    setOrderId(0); 
                    resetFormControls();//Restablecera el Formulario
                    setNotify({ isOpen: true, message: 'Se elimino exitosamente.' });
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>No. Orden</TableCell>
                        <TableCell>Cliente</TableCell>
                        <TableCell>Metodo de Pago</TableCell>
                        <TableCell>Valor Total</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        orderList.map(item => (
                            <TableRow key={item.orderMasterId}>
                                <TableCell 
                                    onClick={e => showForUpdate(item.orderMasterId)}>
                                    {item.orderNumber}
                                </TableCell>
                                <TableCell
                                    onClick={e => showForUpdate(item.orderMasterId)}>
                                    {item.customer.customerName}
                                </TableCell>
                                <TableCell
                                    onClick={e => showForUpdate(item.orderMasterId)}>
                                    {item.pMethod}
                                </TableCell>
                                <TableCell
                                    onClick={e => showForUpdate(item.orderMasterId)}>
                                    {item.gTotal}
                                </TableCell>
                                <TableCell>
                                    <DeleteOutlineTwoToneIcon
                                        color="secondary"
                                        onClick={e => deleteOrder(item.orderMasterId)} />
                                </TableCell>

                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    )
}
