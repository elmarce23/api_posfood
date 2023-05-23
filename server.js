//const TYPE_OF_DB = process.openStdin();
const express = require('express')
const sql = require('mssql')
//const multer = require('multer');

const app = express()
//const upload = multer(); // Configurar multer

app.use(express.json())

const config = {
    user: 'prod',
    password: 'prod123',
    server: 'DESKTOP-UED60N8',
    database: 'TACO_VENTA_POS',
    trustServerCertificate:true,
    options: {
        encrypt: true // Usa la encriptación para mayor seguridad
    }
}

// Iniciar el servidor en puerto 3000
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000')
});

////////////////////////////////////////////////////////////////

/* MODULE PERSONAL */

// Crear un registro en la tabla "personal"
app.post('/personal', upload.none(), async (req, res) => {
  try {
    const cv_personal = req.body.cv_personal
    const nombre = req.body.nombre
    const rol = req.body.rol
    const activo = req.body.activo

    // Realizar la conexión a la base de datos
    await sql.connect(config);

    // Crear la consulta parametrizada
    const query =
      'INSERT INTO personal (cv_personal, nombre, rol, Activo) VALUES (@cv_personal, @nombre, @rol, @activo)';

    // Ejecutar la consulta parametrizada
    const request = new sql.Request();
    request.input('cv_personal', sql.Int, cv_personal);
    request.input('nombre', sql.VarChar, nombre);
    request.input('rol', sql.Int, rol);
    request.input('activo', sql.Bit, activo);

    await request.query(query);

    console.log('Registro creado con éxito')
    res.sendStatus(201)
  } catch (error) {
    console.log('Error al crear el registro:', error)
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
    const query = `SELECT * FROM personal WHERE cv_personal = ${cv_personal}`;
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
app.put('/personal/:cv_personal', upload.none(), async (req, res) => {
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

////////////////////////////////////////////////////////////////

/* PRODUCTOS */

// Obtencion de productos por descripcion (LIKE)
app.get('/productos/:decripcion', async (req, res) => {
  try {
    await sql.connect(config)
    const desc = req.params.decripcion;
    const query = `SELECT * FROM productos WHERE desc_p LIKE '%${desc}%';`;
    const result = await sql.query(query);
    console.log('Registros obtenidos:', result.recordset);
    res.json(result.recordset);
  } catch (error) {
    console.log('Error al obtener los registros:', error);
    res.sendStatus(500);
  } finally {
    sql.close()
  }
});

////////////////////////////////////////////////////////////////

/* CATALOGOS */
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

// Obtiene los diferentes productos (sin filtros)
app.get('/productos', async (req, res) => {
  try {
    await sql.connect(config)
    const query = 'SELECT * FROM productos;'
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

// Obtencion de ingredientes
app.get('/ingredientes', async (req, res) => {
  try {
    await sql.connect(config)
    const query = 'SELECT * FROM ingredientes'
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

// Obtencion de recetas
app.get('/recetas', async (req, res) => {
  try {
    await sql.connect(config)
    const query = 'SELECT * FROM recetas'
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

// Obtencion de personal
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

// Obtencion de comandas
app.get('/comandas', async (req, res) => {
  try {
    await sql.connect(config)
    const query = 'SELECT * FROM comandas'
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

// Obtencion de ordenes
app.get('/ordenes', async (req, res) => {
  try {
    await sql.connect(config)
    const query = 'SELECT * FROM ordenes'
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