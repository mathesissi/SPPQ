"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalidadeService = void 0;
const ModalidadePaes_1 = require("../model/ModalidadePaes");
const ModalidadePaesRepository_1 = require("../repository/ModalidadePaesRepository");
let currentId = 1;
function gerarId() {
    return currentId++;
}
class ModalidadeService {
    constructor() {
        this.modalidadeRepository = new ModalidadePaesRepository_1.ModalidadeRepository();
    }
    cadastrarModalidade(modalidadeInfo) {
        const { nome, vegano } = modalidadeInfo;
        if (!nome || !vegano === undefined) {
            throw new Error("Informacoes incompletas");
        }
        const modalidadeEncontrada = this.consultarModalidade(undefined, nome);
        if (modalidadeEncontrada) {
            throw new Error("Modalidade já cadastrada!");
        }
        const novaModalidade = new ModalidadePaes_1.Modalidade(gerarId(), nome, vegano);
        this.modalidadeRepository.insereModalidade(novaModalidade);
        return novaModalidade;
    }
    consultarModalidade(id, nome) {
        if (id && nome) {
            console.log("Com ID e Name");
            const idNumber = parseInt(id, 10);
            return this.modalidadeRepository.listarModalidadePorNomeId(idNumber, nome);
        }
        else if (id) {
            console.log("Com ID");
            const idNumber = parseInt(id, 10);
            return this.modalidadeRepository.RecuperaPorId(idNumber);
        }
        else if (nome) {
            console.log("Nome");
            return this.modalidadeRepository.listarModalidadePorNome(nome);
        }
        console.log(id);
        return undefined;
    }
    getModalidade(ordem) {
        if (ordem === "desc") {
            return this.modalidadeRepository.listarTodasModalidades().sort((a, b) => b.ID - a.ID);
        }
        return this.modalidadeRepository.listarTodasModalidades().sort((a, b) => a.ID - b.ID);
    }
    deletarModalidade(id) {
        console.log("ID recebido para deleção:", id);
        const modalidade = this.consultarModalidade(id, undefined);
        if (!modalidade) {
            console.log("Modalidade não encontrada para o ID:", id);
            throw new Error("Modalidade não encontrada");
        }
        console.log("Modalidade encontrada:", modalidade);
        this.modalidadeRepository.deletaModalidade(modalidade);
    }
    atualizaModalidade(modalidadeData) {
        console.log("Dados recebidos para atualização:", modalidadeData);
        const { ID, nome, vegano } = modalidadeData;
        if (!ID || !nome || typeof vegano === 'undefined') {
            throw new Error("Informações incompletas");
        }
        let modalidadeEncontrada = this.consultarModalidade(ID, undefined);
        if (!modalidadeEncontrada) {
            throw new Error("Modalidade não cadastrada!");
        }
        modalidadeEncontrada.ID = ID;
        modalidadeEncontrada.nome = nome;
        modalidadeEncontrada.vegano = vegano;
        this.modalidadeRepository.atualizaModalidade(modalidadeEncontrada);
        return modalidadeEncontrada;
    }
}
exports.ModalidadeService = ModalidadeService;
