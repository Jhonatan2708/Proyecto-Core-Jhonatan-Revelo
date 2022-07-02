import axios from "axios";

//Establecemos el dominio  para acceder a cualquier metodo de la API
const BASE_URL = 'http://localhost:53688/api/';

export const ENDPIONTS = {
    CUSTOMER: 'Customer',
    FOODITEM: 'FoodItem', 
    ORDER: 'Order'
}

//Funcion para consumir los metodos de la API
export const createAPIEndpoint = endpoint => {

    let url = BASE_URL + endpoint + '/';
    return {
        fetchAll: () => axios.get(url),
        fetchById: id => axios.get(url + id),
        create: newRecord => axios.post(url, newRecord),
        update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
        delete: id => axios.delete(url + id)
    }
}