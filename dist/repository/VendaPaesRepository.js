"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendaPaesRepository = void 0;
class VendaPaesRepository {
    constructor() {
        this.VendaPaesList = [];
    }
    insereVenda(venda) {
        this.VendaPaesList.push(venda);
    }
    RecuperaPorId(id) {
        return this.VendaPaesList.find(venda => venda.ID === id);
    }
}
exports.VendaPaesRepository = VendaPaesRepository;
