// config for database
const sql = require("mssql");

const config = {
  user: "sa",
  password: "12345678",
  server: "DESKTOP-UED60N8",
  database: "TACO_VENTA_POS",
  trustServerCertificate: true,
  options: {
    encrypt: true, // Usa la encriptación para mayor seguridad
  },
};

/*const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then (pool => {
        console.log("MSSQL CONNECTION SUCCESFULLY")
        return pool
    }).catch(error => console.log("CONNECTION FAILED, BAD CONFIG: ", error))
    module.exports = {
        sql, poolPromise
    }
    */