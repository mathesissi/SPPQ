import { Estoque } from "../model/EstoquePaes";
export class EstoqueRepository{
    EstoqueList: Estoque[] = []

    insereEstoque(estoque: Estoque){
        this.EstoqueList.push(estoque);
    }
    RecuperaPorId(id: number): Estoque|undefined{
        return this.EstoqueList.find(estoque =>estoque.ID === id);
    }
    ListarTodoEstoques():Estoque[]{
        return this.EstoqueList;
    }
    atualizaEstoque(estoque: Estoque): number {
        const index = this.EstoqueList.findIndex(item => item.modalidadeID === estoque.modalidadeID);
        if (index !== -1) {
            this.EstoqueList[index] = estoque;
        }
        return index;
    }
    deletaQuantidadeInformada(modalidadeID: number) {
        const index = this.EstoqueList.findIndex(item => item.modalidadeID === modalidadeID);
        if (index !== -1) {
            this.EstoqueList.splice(index, 1);
        }
    }
    atualizaQuantidadeEstoque(ID: number, quantidade: number): Estoque | undefined {
        const estoque = this.RecuperaPorId(ID);
        if (estoque) {
            estoque.quantidade -= quantidade;
            return estoque;
        }
        return undefined; 
    }
}