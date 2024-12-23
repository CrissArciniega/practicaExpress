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

//PROGRAMACIÓN DEL SERVICIO WEB TYPE:GET

// consumo de servicio 1
app.get('/nombre', (req, res) => {
    res.json(lista);
});

// consumo de servicio 2
app.get('/Cristian', (req, res) => {
    res.send('Hola mi nombre es Cristian Arciniega y tengo 20 años');
});

// consumo de servicio 3
app.get('/suma', (req, res) => {
    let n1 = 2;
    let n2 = 2;
    let suma = n1 + n2;
    res.send(suma + '');
});

// consumo de servicio 4
app.get('/suma/:n1', (req, res) => {
    let n1 = parseInt(req.params.n1); //obteniendo el dato n1
    let n2 = 9;
    let suma = n1 + n2;
    res.send('El resultado de la suma es: ' + suma);
});

//consumo 5
// Área y perímetro del rombo
app.get('/figura/rombo/:d1/:d2', (req, res) => {
    const d1 = parseFloat(req.params.d1);
    const d2 = parseFloat(req.params.d2);
    const area = (d1 * d2) / 2;
    const perimetro = 4 * Math.sqrt((d1 / 2) ** 2 + (d2 / 2) ** 2);

    res.send(`Rombo: Área = ${area}, Perímetro = ${perimetro}`);
});

// Área y perímetro del romboide
app.get('/figura/romboide/:base/:altura', (req, res) => {
    const base = parseFloat(req.params.base);
    const altura = parseFloat(req.params.altura);
    const area = base * altura;
    const perimetro = 2 * (base + altura);

    res.send(`Romboide: Área = ${area}, Perímetro = ${perimetro}`);
});

// Área y perímetro del deltoide
app.get('/figura/deltoide/:d1/:d2', (req, res) => {
    const d1 = parseFloat(req.params.d1);
    const d2 = parseFloat(req.params.d2);
    const area = (d1 * d2) / 2;
    const perimetro = 2 * (d1 + d2);

    res.send(`Deltoide: Área = ${area}, Perímetro = ${perimetro}`);
});

//consumo 6 (factorizado)
app.get('/trinomio/:a/:b/:tipo', (req, res) => {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);
    const tipo = req.params.tipo; // Tipo: suma o resta

    let resultado;
    if (tipo === 'suma') {
        resultado = (a ** 2) + (2 * a * b) + (b ** 2); // (a + b)^2
    } else if (tipo === 'resta') {
        resultado = (a ** 2) - (2 * a * b) + (b ** 2); // (a - b)^2
    } else {
        return res.status(400).send('Tipo inválido. Usa "suma" o "resta".');
    }
    res.send(`El resultado de la operación es: ${resultado}`);
});

//llamada al puerto por defecto de node 3000
app.listen(3000, () => {
    console.log('Escuchando a través del puerto 3000')
});