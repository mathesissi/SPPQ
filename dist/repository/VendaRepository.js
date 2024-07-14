"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendaPaesRepository = void 0;
const database_1 = require("../global/database");
class VendaPaesRepository {
    constructor() {
        this.VendaList = (0, database_1.getVendaList)();
    }
    insereVenda(venda) {
        this.VendaList.push(venda);
    }
    consultaVendaPorId(id) {
        return this.VendaList.find(venda => venda.ID === id);
    }
}
exports.VendaPaesRepository = VendaPaesRepository;
