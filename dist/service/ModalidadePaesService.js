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
        if (typeof nome != "string" || typeof vegano != "boolean") {
            if (nome == null || vegano == null) {
                throw new Error("Informacoes incompletas");
            }
            else {
                throw new Error("Por favor, insira as informações corretamente -> nome:string e vegano: true or false");
            }
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
        if (id) {
            console.log("Consultando com ID");
            const idNumber = parseInt(id, 10);
            return this.modalidadeRepository.RecuperaPorId(idNumber);
        }
        else if (id && nome) {
            console.log("Consultando com ID e nome");
            const idNumber = parseInt(id, 10);
            return this.modalidadeRepository.listarModalidadePorNomeId(idNumber, nome);
        }
        else if (nome) {
            console.log("Consultando com nome");
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
        if (!ID || !nome || typeof vegano == null) {
            throw new Error("Informações incompletas");
        }
        if (typeof nome != "string" || typeof vegano != "boolean") {
            throw new Error("Por favor, insira as informações corretamente -> nome:string e vegano: true or false");
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
