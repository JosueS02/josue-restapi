require('dotenv').config();
const Sequelize = require('sequelize');

const sslConfig = {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // A veces necesario si es un certificado autofirmado
      },
    },
  };


const mysqlConnection = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        dialect: 'mysql',
        logging: false,
        define: {
            timestamps: true
        },
        dialectOptions: { // Agregamos dialectOptions aquí
            ssl: {
              require: true,
              rejectUnauthorized: false, // Manteniendo la configuración SSL
            },
          },
    }
);

const testMySQLConnection = async () => {
    try {
        await mysqlConnection.authenticate();
        return true;
    } catch (error) {
        console.error('Error al conectar con MySQL:', error);
        return false;
    }
};


module.exports = {
    mysqlConnection,
    testMySQLConnection,
};