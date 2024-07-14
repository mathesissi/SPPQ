import { VendaPaes, ItemVenda } from "../model/Venda";
import { VendaPaesRepository } from "../repository/VendaRepository";
import { EstoqueService } from "./EstoquePaesService";
import { ModalidadeRepository } from "../repository/ModalidadePaesRepository";
global;

let currentId = 1;

function gerarId(): number {
    return currentId++;
}
export class VendaPaesService {
    modalidadeRepository: ModalidadeRepository = new ModalidadeRepository();
    estoqueService: EstoqueService = new EstoqueService();
    vendaPaesRepository: VendaPaesRepository = new VendaPaesRepository();

    cadastrarVenda(vendainfo: any): VendaPaes {
        const { cpfCliente, itens } = vendainfo;
        if (typeof cpfCliente != "number") {
            if (!cpfCliente || !itens) {
                throw new Error("Informações incompletas (v)!");
            }
            throw new Error("Por favor, insira as informações corretamente -> cpf:number");
        }
        let valorTotal = 0;
        const itemList: ItemVenda[] = [];

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
            const nome = modalidade.nome
            const itemVenda = new ItemVenda(estoquePaesID, quantidade, nome);
            itemList.push(itemVenda);
        }
        const novaVenda = new VendaPaes(gerarId(), cpfCliente, valorTotal, itemList);
        this.vendaPaesRepository.insereVenda(novaVenda);
        return novaVenda;
    }
    verificarQuantidade(estoqueID: number, quantidadeV: number): boolean {
        const estoque = this.estoqueService.consultarEstoque(estoqueID);
        if (!estoque) {
            throw new Error(`Estoque com ID ${estoqueID} não encontrado`);
        }
        if (estoque.quantidade < quantidadeV) {
            throw new Error(`A quantidade no estoque é inferior à quantidade solicitada para venda. Disponível: ${estoque.quantidade}, Solicitada: ${quantidadeV}`);
        }
        return true;
    }

    consultarVenda(id: any): VendaPaes | undefined {
        const idNumber: number = parseInt(id, 10);
        return this.vendaPaesRepository.consultaVendaPorId(idNumber);
    }
}
