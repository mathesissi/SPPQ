"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarModalidades = exports.pesquisarModalidade = exports.deletarModalidade = exports.atualizarModalidade = exports.cadastrarModalidade = void 0;
const ModalidadePaesService_1 = require("../service/ModalidadePaesService");
const modalidadeService = new ModalidadePaesService_1.ModalidadeService();
function cadastrarModalidade(req, res) {
    try {
        const novaModalidade = modalidadeService.cadastrarModalidade(req.body);
        res.status(201).json({
            mensagem: "Modalidade adcionada com sucesso!",
            modalidade: novaModalidade
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.cadastrarModalidade = cadastrarModalidade;
function atualizarModalidade(req, res) {
    try {
        const novaModalidade = modalidadeService.atualizaModalidade(req.body);
        res.status(201).json({
            mensagem: "Modalidade alterada com sucesso!",
            modalidade: novaModalidade
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.atualizarModalidade = atualizarModalidade;
function deletarModalidade(req, res) {
    try {
        modalidadeService.deletarModalidade(req.query.ID);
        res.status(202).json({ message: "Modalidade deletada com sucesso!" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.deletarModalidade = deletarModalidade;
function pesquisarModalidade(req, res) {
    try {
        const modalidade = modalidadeService.consultarModalidade(req.query.ID, req.query.nome);
        if (modalidade) {
            res.status(200).json({
                mensagem: "Modalidade encontrada com sucesso!",
                modalidade: modalidade
            });
        }
        else {
            res.status(404).json({ mensagem: "Modalidade não encontrada." });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.pesquisarModalidade = pesquisarModalidade;
function listarModalidades(req, res) {
    try {
        res.status(200).json(modalidadeService.getModalidade(req.query.ordem));
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.listarModalidades = listarModalidades;
