const express = require("express");
const routes = express.Router();

const auth = require("../middlewares/usuarioAuth");
const CarroController = require("../controllers/carroController");

routes.get("/carros", auth, CarroController.ListarCarro);
routes.get("/veiculos/relatorio", auth, CarroController.relatorio);
routes.get("/veiculos/cadastrar/:placa?", auth, CarroController.cadastrarCarroGet);
routes.post("/carros", auth, CarroController.cadastrarCarroPost);
routes.get("/carros/remover/:placa", auth, CarroController.removerCarro);
routes.get("/carros/:placa", auth, CarroController.ResultadoCarro);

module.exports = routes;