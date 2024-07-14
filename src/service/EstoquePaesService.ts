import { Estoque } from "../model/EstoquePaes";
import { Modalidade } from "../model/ModalidadePaes";
import { ModalidadeRepository } from "../repository/ModalidadePaesRepository";
import { EstoqueRepository } from "../repository/EstoquePaesRepository";

let currentId = 1;

function gerarId(): number {
    return currentId++;
}
export class EstoqueService {
    estoqueRepository: EstoqueRepository = new EstoqueRepository();
    modalidadeRepository: ModalidadeRepository = new ModalidadeRepository();

    cadastrarEstoque(estoqueInfo: any): Estoque {
        const { ID, modalidadeID, quantidade, precoVenda } = estoqueInfo;

        if (typeof modalidadeID != "number" || typeof quantidade != "number" || typeof precoVenda != "number") {
            if (modalidadeID == null || quantidade == null || precoVenda == null) {
                throw new Error("Informacoes incompletas");
            } else {
                throw new Error("Por favor, insira as informações corretamente -> modalidadeID:number, quantidade:number, precoVenda:number");
            }
        }
        if (quantidade < 0) {
            throw new Error("Quantidade possui um valor negativo");
        }
        const modalidadeEncontrado = this.encontrarModalidadeId(modalidadeID);
        if (!modalidadeEncontrado) {
            throw new Error("Modalidade não encontrada");
        }
        const estoqueEncontrado = this.consultarEstoque(modalidadeID);
        if (estoqueEncontrado) {
            throw new Error("Já existe um estoque para essa modalidade")
        }
        const novoEstoque = new Estoque(gerarId(), modalidadeID, quantidade, precoVenda);
        this.estoqueRepository.insereEstoque(novoEstoque);
        return novoEstoque;
    }
    consultarEstoque(id: any): Estoque | undefined {
        const idNumber: number = parseInt(id, 10);
        return this.estoqueRepository.consultaEstoquePorId(idNumber);
    }
    consultarPorIDeModalidadeId(id: number, modalidadeID: number): Estoque | undefined {
        return this.estoqueRepository.consultaPorIDeModalidadeId(id, modalidadeID)
    }
    encontrarModalidadeId(modalidadeID: number): Modalidade | undefined {
        return this.modalidadeRepository.RecuperaPorId(modalidadeID);
    }
    getEstoque(ordem: any): Estoque[] {
        if (ordem === "desc") {
            return this.estoqueRepository.ListarEstoques().sort((a, b) => b.ID - a.ID);
        }
        return this.estoqueRepository.ListarEstoques().sort((a, b) => b.ID - a.ID);
    }
    atualizaQuantidadeEmEstoque(id: number, quantidade: number): Estoque {
        const estoque = this.estoqueRepository.consultaEstoquePorId(id);
        if (!estoque) {
            throw new Error("Estoque não encontrado");
        }
        if (quantidade < 0) {
            throw new Error("A função requer um numero positivo, acima de 0");
        }
        else {
            estoque.quantidade += quantidade;
            this.estoqueRepository.atualizaEstoque(estoque);
            return estoque;
        }
    }

    atualizaEstoque(ID: number, modalidadeID: number, quantidade: number, precoVenda: number): Estoque {
        const estoque = this.estoqueRepository.consultaEstoquePorId(ID);
        if (!estoque) {
            throw new Error("Estoque não encontrado");
        }

        estoque.modalidadeID = modalidadeID;
        estoque.quantidade = quantidade;
        estoque.precoVenda = precoVenda;
        this.estoqueRepository.atualizaEstoque(estoque);
        return estoque;
    }
    deletarQuantidadeEmEstoque(id: number, quantidadeASubtrair: number): Estoque {
        const estoque = this.estoqueRepository.consultaEstoquePorId(id);
        if (!estoque) {
            throw new Error("Estoque não encontrado");
        }

        if (quantidadeASubtrair <= 0) {
            throw new Error("Voce precisa inserir uma quantidade valida");
        }

        if (quantidadeASubtrair > estoque.quantidade) {
            throw new Error("A quantidade a subtrair precisa maior que a quantidade disponivel no estoque.");
        }

        estoque.quantidade -= quantidadeASubtrair;
        this.estoqueRepository.deletaQuantidadeInformada(estoque.ID, quantidadeASubtrair);
        return estoque;
    }
}