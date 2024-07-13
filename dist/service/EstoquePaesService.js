"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueService = void 0;
const EstoquePaes_1 = require("../model/EstoquePaes");
const ModalidadePaesRepository_1 = require("../repository/ModalidadePaesRepository");
const EstoquePaesRepository_1 = require("../repository/EstoquePaesRepository");
let currentId = 1;
function gerarId() {
    return currentId++;
}
class EstoqueService {
    constructor() {
        this.estoqueRepository = new EstoquePaesRepository_1.EstoqueRepository();
        this.modalidadeRepository = new ModalidadePaesRepository_1.ModalidadeRepository();
    }
    cadastrarEstoque(estoqueInfo) {
        const { ID, modalidadeID, quantidade, precoVenda } = estoqueInfo;
        if (typeof modalidadeID != "number" || typeof quantidade != "number" || typeof precoVenda != "number") {
            if (modalidadeID == null || quantidade == null || precoVenda == null) {
                throw new Error("Informacoes incompletas");
            }
            else {
                throw new Error("Por favor, insira as informações corretamente -> :modalidadeID, quantidade, precoVenda = number");
            }
        }
        if (quantidade < 0) {
            throw new Error("Quantidade possui um valor negativo");
        }
        const modalidadeEncontrado = this.encontrarModalidadeId(modalidadeID);
        if (!modalidadeEncontrado) {
            throw new Error("Modalidade não encontrada");
        }
        const estoqueEncontrado = this.consultarEstoque(modalidadeID);
        if (estoqueEncontrado) {
            throw new Error("Já existe um estoque para essa modalidade");
        }
        const novoEstoque = new EstoquePaes_1.Estoque(gerarId(), modalidadeID, quantidade, precoVenda);
        this.estoqueRepository.insereEstoque(novoEstoque);
        return novoEstoque;
    }
    consultarEstoque(id) {
        const idNumber = parseInt(id, 10);
        return this.estoqueRepository.consultaEstoquePorId(idNumber);
    }
    consultarPorIDeModalidadeId(id, modalidadeID) {
        return this.estoqueRepository.consultaPorIDeModalidadeId(id, modalidadeID);
    }
    encontrarModalidadeId(modalidadeID) {
        return this.modalidadeRepository.RecuperaPorId(modalidadeID);
    }
    getEstoque(ordem) {
        if (ordem === "desc") {
            return this.estoqueRepository.ListarTodoEstoques().sort((a, b) => b.ID - a.ID);
        }
        return this.estoqueRepository.ListarTodoEstoques().sort((a, b) => b.ID - a.ID);
    }
    atualizaQuantidadeEmEstoque(id, quantidade) {
        const estoque = this.estoqueRepository.consultaEstoquePorId(id);
        if (!estoque) {
            throw new Error("Estoque não encontrado");
        }
        if (quantidade < 0) {
            throw new Error("A função requer um numero positivo, acima de 0");
        }
        else {
            estoque.quantidade += quantidade;
            this.estoqueRepository.atualizaEstoque(estoque);
            return estoque;
        }
    }
    atualizaEstoque(ID, modalidadeID, quantidade, precoVenda) {
        const estoque = this.estoqueRepository.consultaEstoquePorId(ID);
        if (!estoque) {
            throw new Error("Estoque não encontrado");
        }
        estoque.modalidadeID = modalidadeID;
        estoque.quantidade = quantidade;
        estoque.precoVenda = precoVenda;
        this.estoqueRepository.atualizaEstoque(estoque);
        return estoque;
    }
    deletarQuantidadeEmEstoque(id, quantidadeASubtrair) {
        const estoque = this.estoqueRepository.consultaEstoquePorId(id);
        if (!estoque) {
            throw new Error("Estoque não encontrado");
        }
        if (quantidadeASubtrair <= 0) {
            throw new Error("Voce precisa inserir uma quantidade valida");
        }
        if (quantidadeASubtrair > estoque.quantidade) {
            throw new Error("A quantidade a subtrair precisa maior que a quantidade disponivel no estoque.");
        }
        estoque.quantidade -= quantidadeASubtrair;
        this.estoqueRepository.deletaQuantidadeInformada(estoque.ID, quantidadeASubtrair);
        return estoque;
    }
}
exports.EstoqueService = EstoqueService;
