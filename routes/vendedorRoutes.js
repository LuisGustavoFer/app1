const express = require("express");
const routes = express.Router();

const auth = require("../middlewares/usuarioAuth");
const VendedorController = require("../controllers/vendedorController");

routes.get("/vendedores", auth, VendedorController.ListarVendedor);
routes.get("/vendedores/relatorio", auth, VendedorController.relatorio);
routes.get("/vendedores/cadastrar/:cpf?", auth, VendedorController.cadastarVendedorGet);
routes.post("/vendedores", auth, VendedorController.cadastarVendedorPost);
routes.get("/vendedores/remover/:cpf", auth, VendedorController.removerVendedor);
routes.get("/vendedores/:cpf", auth, VendedorController.resultadoVendedor);

module.exports = routes;