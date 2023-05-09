//const TYPE_OF_DB = process.openStdin();

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
