"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendaPaes = exports.ItemVenda = void 0;
class ItemVenda {
    constructor(estoquePaesId, quantidade, nome) {
        this.estoquePaesID = estoquePaesId;
        this.quantidade = quantidade;
        this.nome = nome;
    }
}
exports.ItemVenda = ItemVenda;
class VendaPaes {
    constructor(ID, cpf, total, itens) {
        this.ID = ID;
        this.cpfCliente = cpf;
        this.valorTotal = total;
        this.itens = itens;
    }
}
exports.VendaPaes = VendaPaes;
