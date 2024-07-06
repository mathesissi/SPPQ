"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueRepository = void 0;
class EstoqueRepository {
    constructor() {
        this.EstoqueList = [];
    }
    insereEstoque(estoque) {
        this.EstoqueList.push(estoque);
    }
    RecuperaPorId(id) {
        return this.EstoqueList.find(estoque => estoque.ID === id);
    }
    ListarTodoEstoques() {
        return this.EstoqueList;
    }
    atualizaEstoque(estoque) {
        const index = this.EstoqueList.findIndex(item => item.modalidadeID === estoque.modalidadeID);
        if (index !== -1) {
            this.EstoqueList[index] = estoque;
        }
        return index;
    }
    deletaQuantidadeInformada(modalidadeID) {
        const index = this.EstoqueList.findIndex(item => item.modalidadeID === modalidadeID);
        if (index !== -1) {
            this.EstoqueList.splice(index, 1);
        }
    }
    atualizaQuantidadeEstoque(ID, quantidade) {
        const estoque = this.RecuperaPorId(ID);
        if (estoque) {
            estoque.quantidade -= quantidade;
            return estoque;
        }
        return undefined;
    }
}
exports.EstoqueRepository = EstoqueRepository;
