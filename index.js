const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

const auth = require("./middlewares/usuarioAuth");

require('dotenv/config');
const session = require("express-session");
app.use(session({
    secret: 'ifpe',
    saveUninitialized: false,
    resave: false
}));

const carroRoutes = require("./routes/carroRoutes");
app.use(carroRoutes);

const vendedorRoutes = require("./routes/vendedorRoutes");
app.use(vendedorRoutes);

const usuarioRoutes = require("./routes/usuarioRoutes");
app.use(usuarioRoutes);

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

app.get("/", auth, function(req, res){
    res.render("index");
});

app.use(function(req, res){
    res.status(404).render("404");
});

app.listen(process.env.PORT, function(){
    console.log("Servidor Iniciado");
});   