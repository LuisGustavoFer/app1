const VendedorModel = require("../models/VendedorModel");

class VendedorController{

    static async relatorio(req, res){
        const vendedores = await VendedorModel.find();
        res.render("vendas/relatorio", {vendedores});
    }

    static async ListarVendedor(req, res){
        const salvo = req.query.s;
        const deletar = req.query.d;
        const atualizar = req.query.a;

        const vendedores = await VendedorModel.find();
        res.render("vendas/vendedores", {vendedores, salvo, deletar, atualizar})
    };

    static async cadastarVendedorGet(req, res){
        const cpf = req.params.cpf;
        let vendedor = {};
        let escondido = "";

        if (cpf){
            vendedor = await VendedorModel.findOne({cpf:cpf})
            escondido = "hidden";
        }
        res.render("vendas/cadastrar", {vendedor, escondido});
    };

    static async cadastarVendedorPost(req, res){
        const vendedor = req.body;
        console.log(vendedor);

        if(vendedor.id){
            await VendedorModel.findOneAndUpdate({cpf: vendedor.cpf}, {
                nome: vendedor.nome,
                idade: vendedor.idade
            });
            res.redirect("/vendedores?a=1");

        }else{
            const novoVendedor = new VendedorModel({
                cpf: vendedor.cpf,
                nome: vendedor.nome,
                idade: vendedor.idade
            });
        
            await novoVendedor.save();
            res.redirect("/vendedores?s=1");
        }
    };

    static async resultadoVendedor(req, res){
        const cpf = req.params.cpf;
        const resultado = await VendedorModel.findOne({cpf:cpf});
        console.log(resultado);
        res.render("vendas/vendedor", {resultado});
    };

    static async removerVendedor(req,res){
        const cpf = req.params.cpf;  
        await VendedorModel.findOneAndDelete({cpf: cpf});
        res.redirect("/vendedores?d=1");
        
    }
}

module.exports = VendedorController;