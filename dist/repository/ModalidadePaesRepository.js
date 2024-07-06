"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalidadeRepository = void 0;
class ModalidadeRepository {
    constructor() {
        this.ModalidadeList = [];
    }
    // Insere uma modalidade de pão
    insereModalidade(modalidade) {
        this.ModalidadeList.push(modalidade);
    }
    //Recupera uma modalidade por ID.
    RecuperaPorId(id) {
        return this.ModalidadeList.find(modalidade => modalidade.ID === id);
    }
    listarModalidadePorNome(nome) {
        return this.ModalidadeList.find(modalidade => modalidade.nome === nome);
    }
    listarModalidadePorNomeId(id, nome) {
        return this.ModalidadeList.find(modalidade => modalidade.ID === id && modalidade.nome === nome);
    }
    //Retorna uma lista contendo todas as modalidades de pães cadastradas.
    listarTodasModalidades() {
        return this.ModalidadeList;
    }
    //Altera uma modalidade de pão.
    atualizaModalidade(modalidade) {
        const index = this.ModalidadeList.indexOf(modalidade);
        if (index !== -1) {
            this.ModalidadeList[index] = modalidade;
        }
        return index;
    }
    //Deleta uma modalidade de pão.
    deletaModalidade(modalidade) {
        const index = this.ModalidadeList.indexOf(modalidade);
        if (index !== -1) {
            this.ModalidadeList.splice(index, 1);
        }
    }
}
exports.ModalidadeRepository = ModalidadeRepository;
