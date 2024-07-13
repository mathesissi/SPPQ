"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalidadeRepository = void 0;
const database_1 = require("../global/database");
class ModalidadeRepository {
    constructor() {
        this.ModalidadeList = (0, database_1.getModalidadeList)();
    }
    insereModalidade(modalidade) {
        this.ModalidadeList.push(modalidade);
    }
    RecuperaPorId(id) {
        return this.ModalidadeList.find(modalidade => modalidade.ID === id);
    }
    listarModalidadePorNome(nome) {
        return this.ModalidadeList.find(modalidade => modalidade.nome === nome);
    }
    listarModalidadePorNomeId(id, nome) {
        return this.ModalidadeList.find(modalidade => modalidade.ID === id && modalidade.nome === nome);
    }
    listarTodasModalidades() {
        return this.ModalidadeList;
    }
    atualizaModalidade(modalidade) {
        const index = this.ModalidadeList.indexOf(modalidade);
        if (index !== -1) {
            this.ModalidadeList[index] = modalidade;
        }
        return index;
    }
    deletaModalidade(modalidade) {
        const index = this.ModalidadeList.indexOf(modalidade);
        if (index !== -1) {
            this.ModalidadeList.splice(index, 1);
        }
    }
}
exports.ModalidadeRepository = ModalidadeRepository;
