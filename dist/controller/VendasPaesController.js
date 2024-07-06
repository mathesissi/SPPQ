"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consultarVenda = exports.cadastrarVenda = void 0;
const VendasPaesService_1 = require("../service/VendasPaesService");
const vendaService = new VendasPaesService_1.VendaPaesService();
function cadastrarVenda(req, res) {
    try {
        const novaVenda = vendaService.cadastrarVenda(req.body);
        res.status(201).json(novaVenda);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.cadastrarVenda = cadastrarVenda;
function consultarVenda(req, res) {
    try {
        const id = parseInt(req.params.id, 10);
        const venda = vendaService.consultarVenda(id);
        if (!venda) {
            res.status(404).json({ message: "Venda não encontrada" });
        }
        else {
            res.status(200).json(venda);
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.consultarVenda = consultarVenda;
