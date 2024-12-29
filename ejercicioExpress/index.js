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

// CAPTURA DE DATOS MEDIANTE QUERY
// http://localhost:3000/adicion?num1=15&num2=-7
app.get('/adicion', (req, res) => {
    let n1 = parseInt(req.query.num1);
    let n2 = parseInt(req.query.num2);
    let suma = n1 + n2;
    res.json({ resultado: suma }); //json utiliza ({clave : valor});
    // res.send(json);
});

// http://localhost:3000/resta?num1=15&num2=-7
app.get('/resta', (req, res) => {
    var para = req.query; // query= conjunto de datos que se envían al servidor a través de la URL después del signo de interrogación (?)
    console.log(para);   // object = es un tipo de dato que es capaz de contener múltiples valores
    let n1 = parseInt(para.num1);
    let n2 = parseInt(para.num2);
    let resta;
    if (n1 > n2) {
        resta = n1 - n2;
    } else {
        resta = n2 - n1;
    }
    res.send('La resta es: ' + resta);
});
// objeto se compone de métodos y comportamientos que se pueden utilizar en cualquier parte del código 

/* EJERCICIO: calcular un servicio web mediante query que nos permita conocer el valor a pagar en matriculación a pagar
siguiendo las pautas, pauta 1: año del vehículo (si el año es mayor a dos mil pagara un subcidio de contaminación
equivalente al 2% del valor del vehículo, si es de un año menor a dos mil pagara el 5% del valor del vehículo), el valor
de matriculación esta fijado en 96$, si el vehículo posee una placa de IMBABURA - CARCHI - ESMERALDAS - SUCUMBIOS (tendra
un descuento de matriculación del 2.5%), si el vehículo posee multas por cada multa (se pagara 18$). 
Desglosar cada párametro en una estructura json, que contenga una clave que indique el valor total a pagar.*/

// http://localhost:3000/matriculacion?carros=[{"anio":1995,"valor":1800,"placa":"GT-0123","multas":0},{"anio":2005,"valor":2500,"placa":"I-4567","multas":2}]
app.get('/matriculacion', (req, res) => {
    try {
        const carros = JSON.parse(req.query.carros);

        if (!Array.isArray(carros) || carros.length === 0) {
            return res.status(400).json({ error: "Debe proporcionar una lista de carros válida." });
        }

        const resultados = {};
        carros.forEach((carro, index) => {
            const { anio, valor, placa, multas } = carro;

            // Validar que todos los parámetros estén presentes y sean válidos
            if (
                anio === undefined || valor === undefined || placa === undefined || multas === undefined ||
                isNaN(parseInt(anio)) || isNaN(parseFloat(valor)) || typeof placa !== 'string' || isNaN(parseInt(multas))
            ) {
                resultados[`Vehículo ${index + 1}`] = {
                    error: "Todos los parámetros (anio, valor, placa, multas) son obligatorios y deben ser válidos."
                };
                return;
            }

            const anioNum = parseInt(anio);
            const valorNum = parseFloat(valor);
            const multasNum = parseInt(multas);

            // Variables iniciales
            let matricula = 96;
            let descuento = 0;
            let recargo = 0;
            let multa = 0;

            // Cálculo del descuento según el año
            if (anioNum > 2000) {
                descuento = valorNum * 0.02;
            } else {
                descuento = valorNum * 0.05;
            }

            // Cálculo del recargo según la placa
            const provinciasRecargo = ['I', 'C', 'E', 'S'];
            if (placa.length >= 1 && provinciasRecargo.includes(placa[0].toUpperCase())) {
                recargo = matricula * 0.025;
            }

            // Cálculo de multas
            multa = multasNum * 18;

            // Total a pagar
            const total = matricula + descuento + recargo + multa;

            resultados[`Vehiculo ${index + 1}`] = {
                "Anio del vehiculo": anioNum,
                "Placa": placa,
                "Costo de matriculacion": matricula,
                "Descuento por anio del vehiculo": descuento.toFixed(2),
                "Recargo por placa": recargo.toFixed(2),
                "Numero de multas": multasNum,
                "Valor de multas acumuladas": multa.toFixed(2),
                "Total a pagar": total.toFixed(2)
            };
        });

        // Respuesta JSON
        res.json(resultados);
    } catch (error) {
        res.status(400).json({ error: "Error procesando los datos. Verifique el formato del parámetro 'carros'." });
    }
});

//llamada al puerto por defecto de node 3000
app.listen(3000, () => {
    console.log('Escuchando a través del puerto 3000')
});