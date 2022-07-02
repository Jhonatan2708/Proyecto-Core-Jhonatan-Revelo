import React, { useState, useEffect } from 'react'
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import { List, ListItem, ListItemText, Paper, InputBase, IconButton, makeStyles, ListItemSecondaryAction } from '@material-ui/core';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

//Definimos la funcion de estilos 
const useStyles = makeStyles(theme => ({
    searchPaper: {
        padding: '1px 3px',
        display: 'flex',
        alignItems: 'center',
    },
    searchInput: {
        marginLeft: theme.spacing(1.5),
        flex: 1,
    }, 
    listRoot: {
        marginTop: theme.spacing(1),
        maxHeight: 450,
        overflow: 'auto',
        '& li:hover': {
            cursor: 'pointer',
            backgroundColor: '#E3E3E3'
        },
        '& li:hover .MuiButtonBase-root': {
            display: 'block',
            color: '#000',
        },
        '& .MuiButtonBase-root': {
            display: 'none'
        },
        '& .MuiButtonBase-root:hover': {
            backgroundColor: 'transparent'
        }
    }
}))

//Utilizamos "props" para que se puedan obtener los datos desde index.
export default function SearchFoodItems(props) {

    const { values, setValues } = props;
    let orderedFoodItems = values.orderDetails;

    //Creamos un objeto para almacenar la consulta
    const [foodItems, setFoodItems] = useState([]);

    const [searchList, setSearchList] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    
    //Llamamos a la funcion de estilos    
    const classes = useStyles();

    //Creamos la funcion para la devolucion de la llamada
    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.FOODITEM).fetchAll() // Para buscar todo desde nuestro ENDPOINT
            .then(res => {
                //Insertamos FootItems y esta estara dentro de la propiedad de datos
                setFoodItems(res.data);
                setSearchList(res.data);
            })
            .catch(err => console.log(err))

    }, [])

    //Funcion para la devolucion de la llamada con respecto a la busqueda realizada
    useEffect(() => {
        let x = [...foodItems];
        x = x.filter(y => {
            return y.foodItemName.toLowerCase().includes(searchKey.toLocaleLowerCase())
                && orderedFoodItems.every(item => item.foodItemId != y.foodItemId)
        });
        setSearchList(x);
    }, [searchKey, orderedFoodItems]) //Verificamos los alimentos ordenados para que se filtren y ya no aparezcan

    //Funcion para sumar articulos de comida en la orden
    const addFoodItem = foodItem => {
        //Dentro de este objeto definimos todas las propiedades
        let x = {
            orderMasterId: values.orderMasterId,
            orderDetailId: 0,
            foodItemId: foodItem.foodItemId,
            quantity: 1,
            foodItemPrice: foodItem.price,
            foodItemName: foodItem.foodItemName
        }
        setValues({
            ...values,
            orderDetails: [...values.orderDetails, x]
        })
    }

    return (
        <>
            <Paper className={classes.searchPaper}> 
                <InputBase
                    className={classes.searchInput} // Cuadro de busqueda
                    value={searchKey}
                    onChange={e => setSearchKey(e.target.value)}
                    placeholder="Selecciona tu alimento" />
                <IconButton>
                    <SearchTwoToneIcon />
                </IconButton>
            </Paper>
            <List className={classes.listRoot}>
                {
                    searchList.map((item, idx) => (
                        <ListItem
                            key={idx}
                            onClick={e => addFoodItem(item)}>
                            <ListItemText
                                primary={item.foodItemName} //Nos muestra en la lista el numbre de los alimentos y costos de la consulta
                                secondary={'$' + item.price} />
                            <ListItemSecondaryAction>
                                <IconButton onClick={e => addFoodItem(item)}>
                                    <PlusOneIcon />
                                    <ArrowForwardIosIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))
                }
            </List>
        </>
    )
}
