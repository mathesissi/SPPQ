"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consultarVenda = exports.cadastrarVenda = void 0;
const VendasPaesService_1 = require("../service/VendasPaesService");
const vendaService = new VendasPaesService_1.VendaPaesService();
function cadastrarVenda(req, res) {
    try {
        const novaVenda = vendaService.cadastrarVenda(req.body);
        res.status(201).json({
            mensagem: "Venda cadastrada com sucesso!",
            venda: novaVenda
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.cadastrarVenda = cadastrarVenda;
function consultarVenda(req, res) {
    try {
        const venda = vendaService.consultarVenda(parseInt(req.params.id));
        if (venda) {
            res.status(200).json(venda);
        }
        else {
            res.status(404).json({ mensagem: "Venda não encontrada." });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.consultarVenda = consultarVenda;