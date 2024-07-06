"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendaPaesRepository = void 0;
class VendaPaesRepository {
    constructor() {
        this.VendaList = [];
    }
    insereVenda(venda) {
        this.VendaList.push(venda);
    }
    RecuperaPorId(id) {
        return this.VendaList.find(venda => venda.ID === id);
    }
    ListarTodasVendas() {
        return this.VendaList;
    }
}
exports.VendaPaesRepository = VendaPaesRepository;
