const express = require("express");
const routes = express.Router();

const UsuarioController = require("../controllers/usuarioController");
const auth = require("../middlewares/usuarioAuth");

routes.get("/usuarios/", auth, UsuarioController.ListarUsuario);
routes.get("/usuarios/relatorio", auth, UsuarioController.relatorio);
routes.get("/usuarios/cadastrar/:email?", UsuarioController.cadastrarUsuarioGet);
routes.post("/usuarios", UsuarioController.cadastrarUsuarioPost);
routes.get("/usuarios/remover/:email", auth, UsuarioController.removerUsuario);
routes.get("/usuarios/login", UsuarioController.login);
routes.get("/usuarios/logout", UsuarioController.logout);
routes.post("/usuarios/login", UsuarioController.loginPost);
routes.get("/usuarios/:email", auth, UsuarioController.ResultadoUsuario);

module.exports = routes;