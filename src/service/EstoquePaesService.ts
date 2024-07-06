import { Estoque } from "../model/EstoquePaes";
import { EstoqueRepository } from "../repository/EstoquePaesRepository";

let currentId = 1;

function gerarId(): number {
    return currentId++;
}
export class EstoqueService{
    estoqueRepository: EstoqueRepository = new EstoqueRepository();

    cadastrarEstoque(estoqueInfo: any): Estoque{
        const {ID, modalidadeID, quantidade, precoVenda} = estoqueInfo;
        if (modalidadeID == null || quantidade == null || precoVenda == null){
            throw new Error("Informacoes incompletas")
        }
        const novoEstoque = new Estoque(gerarId(), modalidadeID, quantidade, precoVenda);
        this.estoqueRepository.insereEstoque(novoEstoque);
        return novoEstoque;
    }
    consultarEstoque(id: any):Estoque|undefined{
        console.log("consultando ID: ", id)
        const idNumber: number = parseInt(id, 10);
        return this.estoqueRepository.RecuperaPorId(idNumber);
    }
    getEstoque(ordem:any):Estoque[]{
        if(ordem === "desc"){
            return this.estoqueRepository.ListarTodoEstoques().sort((a,b) => b.ID - a.ID);
        }
        return this.estoqueRepository.ListarTodoEstoques().sort((a,b) => b.ID - a.ID);
    }
    atualizaQuantidadeEmEstoque(id: number, quantidade: number): Estoque {
        const estoque = this.estoqueRepository.RecuperaPorId(id);
        if (!estoque) {
            throw new Error("Estoque não encontrado");
        }

        estoque.quantidade += quantidade;
        this.estoqueRepository.atualizaEstoque(estoque);
        return estoque;
    }

    atualizaEstoque(ID: number, modalidadeID: number, quantidade: number, precoVenda: number): Estoque {
        const estoque = this.estoqueRepository.RecuperaPorId(ID);
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
        const estoque = this.estoqueRepository.RecuperaPorId(id);
        if (!estoque) {
            throw new Error("Estoque não encontrado");
        }

        if (quantidadeASubtrair <= 0) {
            throw new Error("SUBTRAIR 0 quantidades??");
        }

        if (quantidadeASubtrair > estoque.quantidade) {
            throw new Error("A quantidade a subtrair é maior que a quantidade disponível no estoque.");
        }

        estoque.quantidade -= quantidadeASubtrair; 
        this.estoqueRepository.atualizaQuantidadeEstoque(estoque.ID, quantidadeASubtrair);
        return estoque;
    }
}