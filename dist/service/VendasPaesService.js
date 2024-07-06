"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendaPaesService = void 0;
const VendaPaes_1 = require("../model/VendaPaes");
const VendaPaesRepository_1 = require("../repository/VendaPaesRepository");
const EstoquePaesService_1 = require("./EstoquePaesService");
let currentId = 1;
function gerarId() {
    return currentId++;
}
class VendaPaesService {
    constructor() {
        this.vendaRepository = new VendaPaesRepository_1.VendaPaesRepository();
        this.estoqueService = new EstoquePaesService_1.EstoqueService();
    }
    cadastrarVenda(vendaInfo) {
        const { cpfCliente, itens } = vendaInfo;
        if (!cpfCliente || !itens || itens.length === 0) {
            throw new Error("Informações incompletas");
        }
        const novaVenda = new VendaPaes_1.VendaPaes(gerarId(), cpfCliente, 0, itens);
        let valorTotal = 0;
        for (const item of itens) {
            const { estoquePaesID, quantidade, nome } = item;
            const estoque = this.estoqueService.consultarEstoque(estoquePaesID);
            if (!estoque || quantidade > estoque.quantidade) {
                throw new Error(`Estoque insuficiente para o item: ${nome}`);
            }
            valorTotal += quantidade * estoque.precoVenda;
            this.estoqueService.deletarQuantidadeEmEstoque(estoquePaesID, quantidade);
        }
        novaVenda.valorTotal = valorTotal;
        this.vendaRepository.insereVenda(novaVenda);
        return novaVenda;
    }
    consultarVenda(id) {
        const idNumber = parseInt(id, 10);
        return this.vendaRepository.RecuperaPorId(idNumber);
    }
}
exports.VendaPaesService = VendaPaesService;
