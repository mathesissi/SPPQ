import { VendaPaes, ItemVenda } from "../model/VendaPaes";
import { VendaPaesRepository } from "../repository/VendaPaesRepository";
import { EstoqueService } from "./EstoquePaesService";
let currentId = 1;

function gerarId(): number {
    return currentId++;
}

export class VendaPaesService {
    vendaRepository: VendaPaesRepository = new VendaPaesRepository();
    estoqueService: EstoqueService = new EstoqueService();

    cadastrarVenda(vendaInfo: any): VendaPaes {
        const { cpfCliente, itens } = vendaInfo;

        if (!cpfCliente || !itens || itens.length === 0) {
            throw new Error("Informações incompletas");
        }

        const novaVenda = new VendaPaes(gerarId(), cpfCliente, 0, itens);

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

    consultarVenda(id: any): VendaPaes | undefined {
        const idNumber: number = parseInt(id, 10);
        return this.vendaRepository.RecuperaPorId(idNumber);
    }
}
