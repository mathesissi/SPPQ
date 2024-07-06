"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletarQuantidadeEmEstoque = exports.atualizaEstoque = exports.atualizaQuantidadeEstoque = exports.RecuperaPorId = exports.ListarTodoEstoques = exports.cadastrarEstoque = void 0;
const EstoquePaesService_1 = require("../service/EstoquePaesService");
const estoqueService = new EstoquePaesService_1.EstoqueService();
function cadastrarEstoque(req, res) {
    try {
        const novoEstoque = estoqueService.cadastrarEstoque(req.body);
        res.status(201).json({
            mensagem: "Item adcionado ao estoque com sucesso!"
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.cadastrarEstoque = cadastrarEstoque;
function ListarTodoEstoques(req, res) {
    try {
        res.status(200).json(estoqueService.getEstoque(req.query.ordem));
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.ListarTodoEstoques = ListarTodoEstoques;
function RecuperaPorId(req, res) {
    try {
        res.status(200).json(estoqueService.getEstoque(req.query.ordem));
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.RecuperaPorId = RecuperaPorId;
function atualizaQuantidadeEstoque(req, res) {
    try {
        const { ID, quantidade } = req.body;
        const estoqueAtualizado = estoqueService.atualizaQuantidadeEmEstoque(ID, quantidade);
        res.status(202).json({
            mensagem: "Quantidade do estoque atualizada com sucesso!",
            estoque: estoqueAtualizado
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.atualizaQuantidadeEstoque = atualizaQuantidadeEstoque;
function atualizaEstoque(req, res) {
    try {
        const { ID, modalidadeID, quantidade, precoVenda } = req.body;
        const estoqueAtualizado = estoqueService.atualizaEstoque(ID, modalidadeID, quantidade, precoVenda);
        res.status(202).json({
            mensagem: "Estoque atualizado com sucesso!",
            estoque: estoqueAtualizado
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.atualizaEstoque = atualizaEstoque;
function deletarQuantidadeEmEstoque(req, res) {
    try {
        const { ID, quantidade } = req.body;
        const estoqueAtualizado = estoqueService.deletarQuantidadeEmEstoque(ID, quantidade);
        res.status(202).json({
            mensagem: "Quantidade subtraída com sucesso!",
            estoque: estoqueAtualizado
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.deletarQuantidadeEmEstoque = deletarQuantidadeEmEstoque;
