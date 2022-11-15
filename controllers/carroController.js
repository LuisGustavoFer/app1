const CarroModel = require("../models/CarroModel");

class CarroController{

    static async relatorio(req, res){
        const carros = await CarroModel.find();
        res.render("veiculos/relatorio", {carros});
    }
    
    static async ListarCarro(req, res){
        const salvo = req.query.s;
        const deletar = req.query.d;
        const atualizar = req.query.a;
        
        const carros = await CarroModel.find();
        res.render("veiculos/carros", {carros, salvo, deletar,atualizar})
    };
    
    static async cadastrarCarroGet (req, res){
        const placa = req.params.placa;
        let carro = {};
        let escondido = "";
        if (placa){
            carro = await CarroModel.findOne({placa:placa})
            escondido = "hidden";
        }
        
        res.render("veiculos/cadastrar", {carro, escondido});
    };
    
    static async cadastrarCarroPost(req, res){
        const carro = req.body;
        console.log(carro);

        if(carro.id){
            await CarroModel.findOneAndUpdate({placa: carro.placa}, {
                modelo: carro.modelo,
                cor: carro.cor
            });
            res.redirect("/carros?a=1");

        }else{
            const novoCarro = new CarroModel({
                placa: carro.placa,
                modelo: carro.modelo,
                cor: carro.cor
            });
            await novoCarro.save();
            res.redirect("/carros?s=1");
        }
    };

    static async ResultadoCarro(req, res){
        const placa = req.params.placa;
        const resultado = await CarroModel.findOne({placa:placa})
        res.render("veiculos/carro", {resultado});
    
    };
    
    static async removerCarro(req,res){
        const pla = req.params.placa;  
        await CarroModel.findOneAndDelete({placa: pla});
        res.redirect("/carros?d=1");
    };
}

module.exports = CarroController;