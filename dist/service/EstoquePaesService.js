"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueService = void 0;
const EstoquePaes_1 = require("../model/EstoquePaes");
const EstoquePaesRepository_1 = require("../repository/EstoquePaesRepository");
let currentId = 1;
function gerarId() {
    return currentId++;
}
class EstoqueService {
    constructor() {
        this.estoqueRepository = new EstoquePaesRepository_1.EstoqueRepository();
    }
    cadastrarEstoque(estoqueInfo) {
        const { ID, modalidadeID, quantidade, precoVenda } = estoqueInfo;
        if (modalidadeID == null || quantidade == null || precoVenda == null) {
            throw new Error("Informacoes incompletas");
        }
        const novoEstoque = new EstoquePaes_1.Estoque(gerarId(), modalidadeID, quantidade, precoVenda);
        this.estoqueRepository.insereEstoque(novoEstoque);
        return novoEstoque;
    }
    consultarEstoque(id) {
        console.log("consultando ID: ", id);
        const idNumber = parseInt(id, 10);
        return this.estoqueRepository.RecuperaPorId(idNumber);
    }
    getEstoque(ordem) {
        if (ordem === "desc") {
            return this.estoqueRepository.ListarTodoEstoques().sort((a, b) => b.ID - a.ID);
        }
        return this.estoqueRepository.ListarTodoEstoques().sort((a, b) => b.ID - a.ID);
    }
    atualizaQuantidadeEmEstoque(id, quantidade) {
        const estoque = this.estoqueRepository.RecuperaPorId(id);
        if (!estoque) {
            throw new Error("Estoque não encontrado");
        }
        estoque.quantidade += quantidade;
        this.estoqueRepository.atualizaEstoque(estoque);
        return estoque;
    }
    atualizaEstoque(ID, modalidadeID, quantidade, precoVenda) {
        const estoque = this.estoqueRepository.RecuperaPorId(ID);
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
        const estoque = this.estoqueRepository.RecuperaPorId(id);
        if (!estoque) {
            throw new Error("Estoque não encontrado");
        }
        if (quantidadeASubtrair <= 0) {
            throw new Error("SUBTRAIR 0 quantidades??");
        }
        if (quantidadeASubtrair > estoque.quantidade) {
            throw new Error("A quantidade a subtrair é maior que a quantidade disponível no estoque.");
        }
        estoque.quantidade -= quantidadeASubtrair;
        this.estoqueRepository.atualizaQuantidadeEstoque(estoque.ID, quantidadeASubtrair);
        return estoque;
    }
}
exports.EstoqueService = EstoqueService;
