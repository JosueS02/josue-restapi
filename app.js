require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { mysqlConnection } = require('./config/database');
const f1Model = require('./models/f1');
const createPilotos = require('./controllers/controller');
const { configurarRutas } = require('./routes/routes');

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const pilotosF1 = f1Model(mysqlConnection);

const mysqlController = createPilotos(pilotosF1);


const mysqlRouter = express.Router();

configurarRutas(mysqlRouter, mysqlController, 'mysql');

app.use('/api/f1', mysqlRouter);

app.get('/api/status', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

app.use(express.static(path.join(__dirname, 'frontend')));
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: err.message || 'Error interno del servidor' });
});

app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

module.exports = app;