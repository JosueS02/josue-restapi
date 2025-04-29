require('dotenv').config();
const app = require('./app');
const {mysqlConnection,testMySQLConnection } = require('./config/database');

const PORT = process.env.PORT || 8080;

const startServer = async () => {
    try {

        const mysqlConnected = await testMySQLConnection();

        if (!mysqlConnected) {
            console.error('No se pudo conectar a ninguna base de datos. Verifique la configuración.');
            process.exit(1);
        }

        if (mysqlConnected) {
            await mysqlConnection.sync();
        }

        app.listen(PORT, () => {
            console.log(`Servidor iniciado en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1);
    }
};

startServer();