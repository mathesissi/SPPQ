"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consultarVenda = exports.cadastrarVenda = void 0;
const VendasService_1 = require("../service/VendasService");
const vendaPaesService = new VendasService_1.VendaPaesService();
function cadastrarVenda(req, res) {
    try {
        const novaVenda = vendaPaesService.cadastrarVenda(req.body);
        res.status(200).json({
            mensagem: "Venda realizada com sucesso!",
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
        const venda = vendaPaesService.consultarVenda(Number(req.params.id));
        if (venda) {
            res.status(200).json(venda);
        }
        else {
            res.status(404).json({ message: "Venda não encontrada" });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.consultarVenda = consultarVenda;
