const UsuarioModel = require("../models/UsuarioModel");
const bcryptjs = require("bcryptjs");

class UsuarioController{
    
    static async relatorio(req, res){
        const usuarios = await UsuarioModel.find();
        res.render("usuario/relatorio", {usuarios});
    }
    
    static async logout(req, res){
        req.session.usuario = undefined;
        res.redirect("/usuarios/login");
    }
    
    static async login(req, res){
        if (req.session.usuario) {
            res.redirect("/");
        } else {
            const s = req.query.s;
            const e = req.query.e;
            let mensagem;
            let cor;
            if (s == "1") {
                mensagem = "Usuário Cadastrado com sucesso. Faça o login.";
                cor = "Green";
            } else if (e == "1") {
                mensagem = "E-mail e/ou senha inválido(s).";
                cor = "Red";
            } 
            res.render("usuario/login", { mensagem, cor });
        }
    }
    static async loginPost(req, res){
        const usuario = req.body;
        const resultado = await UsuarioModel.findOne({email: usuario.email});
        
        if(resultado){
            if(bcryptjs.compareSync(usuario.senha, resultado.senha)){
                req.session.usuario = resultado.email;
                res.redirect("/");

            } else {
                res.redirect("/usuarios/login?e=1");
            }

        } else{
            res.redirect("/usuarios/login?e=1");
        }
    }
    
    static async ListarUsuario(req, res){
        const s = req.query.s;
        let mensagem;
        let cor;
        if (s == "1") {
            mensagem = "Cadastrado com sucesso";
            cor = "Green";
        } else if (s == "2") {
            mensagem = "Removido com sucesso";
            cor = "Red";
        } else if (s == "3") {
            mensagem = "Atualizado com sucesso";
            cor = "Yellow";
        }

        const usuarios = await UsuarioModel.find();
        res.render("usuario/usuarios", { usuarios, mensagem, cor });
    };

    static async cadastrarUsuarioGet (req, res){
        if (req.session.usuario) {
            res.redirect("/");
        } else {
            const email = req.params.email;
            const erro = req.query.e;
            let usuario = {};
            let escondido = "";
            
            if (email) {
                usuario = await UsuarioModel.findOne({ email: email });
                escondido = "hidden";
            }
            res.render("usuario/cadastrar", { usuario, escondido, erro });
        }
    };

    static async cadastrarUsuarioPost(req, res){
        const usuario = req.body;
        const salt = bcryptjs.genSaltSync();
        const hash = bcryptjs.hashSync(usuario.senha, salt);

        if(usuario.id){
            await UsuarioModel.findOneAndUpdate({email: usuario.email}, {
                nome: usuario.nome,
                senha: hash
            });
            res.redirect("/usuarios?s=3");
        }else{
            const resultado = await UsuarioModel.findOne({ email: usuario.email });
            if (resultado) {
                res.redirect("/usuarios/cadastrar?e=1");
            } else {
                const novoUsuario = new UsuarioModel({
                    email: usuario.email,
                    nome: usuario.nome,
                    senha: hash
                });
                await novoUsuario.save();
                res.redirect("/usuarios?s=1");
            }
        }
        
    };
    
    static async ResultadoUsuario(req, res){
        const email = req.params.email;
        const resultado = await UsuarioModel.findOne({email:email})
        res.render("usuario/usuario", {resultado});
    
    };

    static async removerUsuario(req,res){
        const email = req.params.email;  
        const resultado = await UsuarioModel.findOneAndDelete({email: email});
        res.redirect("/usuarios?s=2");
    };
}

module.exports = UsuarioController;