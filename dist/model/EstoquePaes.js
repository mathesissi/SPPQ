"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estoque = void 0;
class Estoque {
    constructor(ID, modalidadeID, quantidade, precoVenda) {
        this.ID = ID;
        this.modalidadeID = modalidadeID;
        this.quantidade = quantidade;
        this.precoVenda = precoVenda;
    }
}
exports.Estoque = Estoque;
