"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendaPaesService = void 0;
const Venda_1 = require("../model/Venda");
const VendaRepository_1 = require("../repository/VendaRepository");
const EstoquePaesService_1 = require("./EstoquePaesService");
const ModalidadePaesRepository_1 = require("../repository/ModalidadePaesRepository");
global;
let currentId = 1;
function gerarId() {
    return currentId++;
}
class VendaPaesService {
    constructor() {
        this.modalidadeRepository = new ModalidadePaesRepository_1.ModalidadeRepository();
        this.estoqueService = new EstoquePaesService_1.EstoqueService();
        this.vendaPaesRepository = new VendaRepository_1.VendaPaesRepository();
    }
    cadastrarVenda(vendainfo) {
        const { cpfCliente, itens } = vendainfo;
        if (typeof cpfCliente != "number") {
            if (!cpfCliente || !itens) {
                throw new Error("Informações incompletas (v)!");
            }
            throw new Error("Por favor, insira as informações corretamente -> cpf:number");
        }
        let valorTotal = 0;
        const itemList = [];
        for (var item of itens) {
            const { estoquePaesID, quantidade } = item;
            if (typeof estoquePaesID != "number" || typeof quantidade != "number") {
                if (!estoquePaesID || !quantidade) {
                    throw new Error("Informações incompletas!(l)");
                }
                throw new Error("Por favor, insira as informações corretamente -> cpf:number");
            }
            const estoqueEncontrado = this.estoqueService.consultarEstoque(estoquePaesID);
            if (!estoqueEncontrado) {
                throw new Error("Não foi possivel concluir a venda: estoque não encontrado!");
            }
            const saldoPositivo = this.verificarQuantidade(estoquePaesID, quantidade);
            if (saldoPositivo) {
                this.estoqueService.deletarQuantidadeEmEstoque(estoquePaesID, quantidade);
            }
            const precoVenda = estoqueEncontrado.precoVenda;
            valorTotal += precoVenda * quantidade;
            const modalidade = this.modalidadeRepository.RecuperaPorId(estoqueEncontrado.modalidadeID);
            if (!modalidade) {
                throw new Error("Não foi possivel encontrar a modalidade");
            }
            const nome = modalidade.nome;
            const itemVenda = new Venda_1.ItemVenda(estoquePaesID, quantidade, nome);
            itemList.push(itemVenda);
        }
        const novaVenda = new Venda_1.VendaPaes(gerarId(), cpfCliente, valorTotal, itemList);
        this.vendaPaesRepository.insereVenda(novaVenda);
        return novaVenda;
    }
    verificarQuantidade(estoqueID, quantidadeV) {
        const estoque = this.estoqueService.consultarEstoque(estoqueID);
        if (!estoque) {
            throw new Error(`Estoque com ID ${estoqueID} não encontrado`);
        }
        if (estoque.quantidade < quantidadeV) {
            throw new Error(`A quantidade no estoque é inferior à quantidade solicitada para venda. Disponível: ${estoque.quantidade}, Solicitada: ${quantidadeV}`);
        }
        return true;
    }
    consultarVenda(id) {
        return this.vendaPaesRepository.consultaVendaPorId(id);
    }
}
exports.VendaPaesService = VendaPaesService;
