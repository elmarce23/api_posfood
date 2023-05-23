// config for database
const sql = require("mssql");

const config = {
  user: "prod",
  password: "prod123",
  server: "DESKTOP-UED60N8",
  database: "TACO_VENTA_POS",
  trustServerCertificate: true,
  options: {
    encrypt: true, // Usa la encriptación para mayor seguridad
  },
};

sql.connect( config, err => {
  if (err) {
    console.error("Error en Conexión a la BD: ", err);
  }else {
    console.log("Conexión exitosa.");
  }
});