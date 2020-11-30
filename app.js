const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
var exphbs = require("express-handlebars");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "codoacodo",
}); //datos de conexion con la base de datos

connection.connect((error) => {
  if (error) throw error;
  console.log(connection.threadId);
}); //llamar a conectar a la db con los datos de mas arriba
//captura el error y si lo hay lo console log

app.use(express.urlencoded({ extended: false })); //va a permitir que pueda leer lo que venga en el body

app.engine(".hbs", exphbs());
app.set("view engine", ".hbs");

app.get("/", (req, res) => {
  connection.query("SELECT * FROM usuarios", (error, results, fields) => {
    if (error) throw error;
    res.render("inicio", { results });
  }); //hace la query y la pasa a handle
});

app.get("/show/:id", (req, res) => {
  const { id } = req.params; //trae todos los parametros de la url
  connection.query(
    "SELECT * FROM usuarios WHERE id = " + id,
    (error, results, fields) => {
      if (error) throw error;
      res.render("show", { user: results[0] }); //selecto con where para traer por id
    } //llamamos a la vista show con el valor que trajimos de cvla query
  ); //hace la query y la pasa a handle
});

app.get("/edit/:id", (req, res) => {
  const { id } = req.params; //trae todos los parametros de la url
  connection.query(
    "SELECT * FROM usuarios WHERE id = " + id,
    (error, results, fields) => {
      if (error) throw error;
      res.render("edit", { user: results[0] }); //selecto con where para traer por id
    } //llamamos a la vista show con el valor que trajimos de cvla query
  ); //hace la query y la pasa a handle
});

app.get("/delete/:id", (req, res) => {
  const { id } = req.params; //trae todos los parametros de la url
  connection.query(
    "DELETE  FROM usuarios WHERE id = " + id,
    (error, results, fields) => {
      if (error) throw error;
      res.redirect("/"); //selecto con where para traer por id
    } //llamamos a la vista show con el valor que trajimos de cvla query
  ); //hace la query y la pasa a handle
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.get("/contacto", (req, res) => {
  res.render("contact");
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.post("/store", (req, res) => {
  const { user, pass } = req.body; // desestructuracion, levanta del body la informacion enviada por post
  connection.query(
    "INSERT INTO usuarios SET ?",
    { user, pass },
    (error, result) => {
      if (error) throw error;
      res.redirect("/");
    }
  );
});

app.post("/update/:id", (req, res) => {
  const { id } = req.params; //trae todos los parametros de la url
  const { user, pass } = req.body; // desestructuracion, levanta del body la informacion enviada por post
  connection.query(
    "UPDATE usuarios SET ? WHERE id =" + id,
    { user, pass },
    (error, result) => {
      if (error) throw error;
      res.redirect("/");
    }
  );
});

app.listen(port, () => {
  console.log("server corriendo" + port);
});
