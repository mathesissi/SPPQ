"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueRepository = void 0;
const database_1 = require("../global/database");
class EstoqueRepository {
    constructor() {
        this.EstoqueList = (0, database_1.getEstoqueList)();
    }
    insereEstoque(estoque) {
        this.EstoqueList.push(estoque);
    }
    consultaEstoquePorId(id) {
        return this.EstoqueList.find(estoque => estoque.ID === id);
    }
    consultaPorIDeModalidadeId(id, modalidadeID) {
        return this.EstoqueList.find(estoque => estoque.ID === id && estoque.modalidadeID === modalidadeID);
    }
    ListarEstoques() {
        return this.EstoqueList;
    }
    atualizaEstoque(estoque) {
        const index = this.EstoqueList.findIndex(item => item.ID === estoque.ID);
        if (index !== -1) {
            this.EstoqueList[index] = estoque;
        }
        return index;
    }
    deletaQuantidadeInformada(ID, quantidade) {
        const estoque = this.consultaEstoquePorId(ID);
        if (estoque) {
            estoque.quantidade - quantidade;
            return estoque;
        }
    }
    atualizaQuantidadeEstoque(ID, quantidade) {
        const estoque = this.consultaEstoquePorId(ID);
        if (estoque) {
            estoque.quantidade += quantidade;
            return estoque;
        }
        return undefined;
    }
}
exports.EstoqueRepository = EstoqueRepository;
