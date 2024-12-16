const express = require('express');
const app = express();
app.use(express.json());

var lista = [{
    id: '1',
    nombre: 'Cristian'

}, {
    id: '2',
    nombre: 'Bladimir'
}];

//programación del web service type:GET
app.get('/nombre', (req, res) => {
    res.json(lista);
});

//llamada al puerto por defecto de node 3000
app.listen(3000, () => {
    console.log('Escuchando a través del puerto 3000')
});