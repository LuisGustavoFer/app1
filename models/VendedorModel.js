const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vendedorSchema = Schema({
    cpf: String,
    nome: String,
    idade: Number    
});

module.exports = mongoose.model("Vendedor", vendedorSchema);