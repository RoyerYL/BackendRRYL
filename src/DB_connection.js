require('dotenv').config();  // Esto carga las variables del archivo .env

const { Sequelize } = require('sequelize');
const ArticuloFunction = require('./models/Articulo');
const CategoriaFunction = require('./models/Categoria');
const ProvedorFunction = require('./models/Provedor');
const ClienteFunction = require('./models/Cliente');
const TicketFunction = require('./models/Ticket');
const TicketDataFunction = require('./models/TicketData');
const CompraFunction = require('./models/Compra');
const CajaFunction = require('./models/Caja');
const VendedorFunction = require('./models/Vendedor');
const CotizacionFunction = require('./models/Cotizacion');
const MercaderiaFunction = require('./models/Mercaderia');
const ValidadorFunction = require("./models/Validador");

// Crear la instancia de Sequelize usando las variables de entorno
const dataBase = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  logging: false,  // Desactiva el registro de consultas SQL
});

// Importar los modelos
ArticuloFunction(dataBase);
CategoriaFunction(dataBase);
ProvedorFunction(dataBase);
ClienteFunction(dataBase);
TicketFunction(dataBase);
CompraFunction(dataBase);
VendedorFunction(dataBase);
CajaFunction(dataBase);
CotizacionFunction(dataBase);
MercaderiaFunction(dataBase);
ValidadorFunction(dataBase);
TicketDataFunction(dataBase);

// Configurar las relaciones entre modelos
const { Articulo, Provedor, Categoria, Cliente, Ticket, Compra, Caja, Vendedor, Cotizacion, Mercaderia, TicketData } = dataBase.models;

Categoria.hasMany(Articulo, { foreignKey: 'CategoriaId' });
Articulo.belongsTo(Categoria, { foreignKey: 'CategoriaId' });

Provedor.hasMany(Articulo, { foreignKey: 'ProvedorId' });
Articulo.belongsTo(Provedor, { foreignKey: 'ProvedorId' });

Cliente.hasMany(Ticket);
Ticket.belongsTo(Cliente);

Vendedor.hasMany(Ticket, { foreignKey: 'VendedorId' });
Ticket.belongsTo(Vendedor, { foreignKey: 'VendedorId' });

Ticket.hasMany(Compra);
Compra.belongsTo(Ticket);

Caja.hasMany(Ticket);
Ticket.belongsTo(Caja);

Provedor.hasMany(Mercaderia);
Mercaderia.belongsTo(Provedor);

Vendedor.hasMany(Mercaderia);
Mercaderia.belongsTo(Vendedor);

// Exportar la base de datos y modelos
module.exports = {
  dataBase,
  Mercaderia,
  Articulo,
  Provedor,
  Categoria,
  Compra,
  Ticket,
  Cliente,
  Vendedor,
  Caja,
  Cotizacion,
  TicketData
};
