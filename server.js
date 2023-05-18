//const TYPE_OF_DB = process.openStdin();
const express = require('express')
const sql = require('mssql')
const port = 3_000

const app = express()
app.use(express.json())

const config = {
    user: 'sa',
    password: '12345678',
    server: 'DESKTOP-UED60N8',
    database: 'TACO_VENTA_POS',
    trustServerCertificate:true,
    options: {
        encrypt: true // Usa la encriptación para mayor seguridad
    }
}

//const pool = new sql.ConnectionPool(config)

// Crear un registro en la tabla "personal"
app.post('/personal', async (req, res) => {
  try {
    await sql.connect(config)
    const { nombre, rol, activo } = req.body
    const query = `INSERT INTO personal (id, nombre, rol, Activo) VALUES (${id}, '${nombre}', ${rol}, ${activo})`
    await sql.query(query)
    console.log('Registro creado con éxito')
    res.sendStatus(201)
  } catch (error) {
    console.log('Error al crear el registro:', error)
    res.sendStatus(500)
  } finally {
    sql.close()
  }
});

// Obtener todos los registros de la tabla "personal"
app.get('/personal', async (req, res) => {
  try {
    await sql.connect(config)
    const query = 'SELECT * FROM personal'
    const result = await sql.query(query)
    console.log('Registros obtenidos:', result.recordset)
    res.json(result.recordset)
  } catch (error) {
    console.log('Error al obtener los registros:', error)
    res.sendStatus(500)
  } finally {
    sql.close()
  }
});

// Obtener un registro de "personal"
app.get('/personal/:cv_personal', async (req, res) => {
  try {
    await sql.connect(config)
    const cv_personal = req.params.cv_personal
    const query = `SELECT * FROM personal WHERE cv_personal = ${cv_personal}`
    const result = await sql.query(query)
    if (result.recordset.length > 0) {
      console.log('Registro obtenido:', result.recordset[0])
      res.json(result.recordset[0])
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    console.log('Error al obtener el registro:', error)
    res.sendStatus(500)
  } finally {
    sql.close()
  }
});

// Actualizar un registro en la tabla "personal"
app.put('/personal/:cv_personal', async (req, res) => {
  try {
    await sql.connect(config)
    const cv_personal = req.params.cv_personal
    const { nombre, rol, activo } = req.body
    const query = `UPDATE personal SET nombre = '${nombre}', rol = ${rol}, Activo = ${activo} WHERE cv_personal = ${cv_personal}`
    await sql.query(query)
    console.log('Registro actualizado con éxito')
    res.sendStatus(200)
  } catch (error) {
    console.log('Error al actualizar el registro:', error)
    res.sendStatus(500)
  } finally {
    sql.close()
  }
});

// Eliminar un registro en la tabla "personal"
app.delete('/personal/:cv_personal', async (req, res) => {
  try {
    await sql.connect(config)
    const cv_personal = req.params.cv_personal
    const query = `DELETE FROM personal WHERE cv_personal = ${cv_personal}`
    await sql.query(query)
    console.log('Registro eliminado con éxito')
    res.sendStatus(200)
  } catch (error) {
    console.log('Error al eliminar el registro:', error)
    res.sendStatus(500)
  } finally {
    sql.close()
  }
});

/* **** ROLES **** */
// Obttencion de roles
app.get('/rol', async (req, res) => {
  try {
    await sql.connect(config)
    const query = 'SELECT * FROM roles'
    const result = await sql.query(query)
    console.log('Registros obtenidos:', result.recordset)
    res.json(result.recordset)
  } catch (error) {
    console.log('Error al obtener los registros:', error)
    res.sendStatus(500)
  } finally {
    sql.close()
  }
});

// Obttencion de mesas
app.get('/mesas', async (req, res) => {
  try {
    await sql.connect(config)
    const query = 'SELECT * FROM mesas'
    const result = await sql.query(query)
    console.log('Registros obtenidos:', result.recordset)
    res.json(result.recordset)
  } catch (error) {
    console.log('Error al obtener los registros:', error)
    res.sendStatus(500)
  } finally {
    sql.close()
  }
});

// Obttencion de tipos_productos
app.get('/tiposprod', async (req, res) => {
  try {
    await sql.connect(config)
    const query = 'SELECT * FROM tipo_prod'
    const result = await sql.query(query)
    console.log('Registros obtenidos:', result.recordset)
    res.json(result.recordset)
  } catch (error) {
    console.log('Error al obtener los registros:', error)
    res.sendStatus(500)
  } finally {
    sql.close()
  }
});


// Iniciar el servidor en puerto 3000
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000')
});

/*
pool.connect().then(() => {
    console.log('Conexión exitosa a SQL Server')
}).catch(err => {
    console.log('Error al conectarse a SQL Server \n', err)
})
*/

/*
const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tu-contraseña",
  database: "tu-base-de-datos",
});

connection.connect((error) => {
  if (error) {
    console.error("Error de conexión:", error);
  } else {
    console.log("Conexión exitosa a la base de datos.");
  }
});

app.get("/usuarios", (req, res) => {
  const sql = "SELECT * FROM usuarios";

  connection.query(sql, (error, results) => {
    if (error) {
      console.error("Error de consulta:", error);
      res.status(500).json({ error: "Error de consulta" });
    } else {
      res.json(results);
    }
  });
});

app.get("/usuarios/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Usuarios WHERE ID = ?";

  connection.query(sql, [id], (error, results) => {
    if (error) {
      console.error("Error de consulta:", error);
      res.status(500).json({ error: "Error de consulta" });
    } else if (results.length === 0) {
      res.status(404).json({ error: "Usuario no encontrado" });
    } else {
      res.json(results[0]);
    }
  });
});

app.post("/usuarios", (req, res) => {
  const { Nombre, Correo, Contraseña, Rol, Fecha_Creacion, Activo } = req.body;
  const sql =
    "INSERT INTO Usuarios (Nombre, Correo, Contraseña, Rol, Fecha_Creacion, Activo) VALUES (?, ?, ?, ?, ?, ?)";

  connection.query(
    sql,
    [Nombre, Correo, Contraseña, Rol, Fecha_Creacion, Activo],
    (error, result) => {
      if (error) {
        console.error("Error de consulta:", error);
        res.status(500).json({ error: "Error de consulta" });
      } else {
        res.status(201).json({
          message: "Usuario creado correctamente",
          ID: result.insertId,
        });
      }
    }
  );
});

app.put("/usuarios/:id", (req, res) => {
  const id = req.params.id;
  const { Nombre, Correo, Contraseña, Rol, Fecha_Creacion, Activo } = req.body;
  const sql =
    "UPDATE Usuarios SET Nombre = ?, Correo = ?, Contraseña = ?, Rol = ?, Fecha_Creacion = ?, Activo = ? WHERE ID = ?";

  connection.query(
    sql,
    [Nombre, Correo, Contraseña, Rol, Fecha_Creacion, Activo, id],
    (error, result) => {
      if (error) {
        console.error("Error de consulta:", error);
        res.status(500).json({ error: "Error de consulta" });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: "Usuario no encontrado" });
      } else {
        res.json({ message: "Usuario actualizado correctamente" });
      }
    }
  );
});

app.delete("/usuarios/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM Usuarios WHERE ID = ?";

  connection.query(sql, [id], (error, result) => {
    if (error) {
      console.error("Error de consulta:", error);
      res.status(500).json({ error: "Error de consulta" });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: "Usuario no encontrado" });
    } else {
      res.json({ message: "Usuario eliminado correctamente" });
    }
  });
});

app.listen(port, () => {
  console.log(`API Rest ejecutándose en http://localhost:${port}`);
});
*/