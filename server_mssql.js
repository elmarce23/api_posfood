const sql = require('mssql')

const config = {
    user: 'sa',
    password: '12345678',
    server: 'DESKTOP-UED60N8',
    database: 'TACO_VENTA_POS',
    options: {
        encrypt: true // Usa la encriptación para mayor seguridad
    }
}

const pool = new sql.ConnectionPool(config)

pool.connect().then(() => {
    console.log('Conexión exitosa a SQL Server')
}).catch(err => {
    console.log('Error al conectarse a SQL Server', err)
})