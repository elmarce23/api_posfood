const sql = require('mssql')

const config = {
    user: '<usuario>',
    password: '<contraseña>',
    server: '<servidor>',
    database: '<base de datos>',
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
