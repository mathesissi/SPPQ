import { Estoque } from "../model/EstoquePaes";
export class EstoqueRepository{
    EstoqueList: Estoque[] = []

    insereEstoque(estoque: Estoque){
        this.EstoqueList.push(estoque);
    }
    consultaEstoquePorId(id: number): Estoque|undefined{
        return this.EstoqueList.find(estoque =>estoque.ID === id);
    }
    consultaPorIDeModalidadeId(id: number, modalidadeID: number): Estoque|undefined{
        return this.EstoqueList.find(estoque => estoque.ID === id && estoque.modalidadeID === modalidadeID);
    }
    ListarTodoEstoques():Estoque[]{
        return this.EstoqueList;
    }
    atualizaEstoque(estoque: Estoque): number {
        const index = this.EstoqueList.findIndex(item => item.ID === estoque.ID);
        if (index !== -1) {
            this.EstoqueList[index] = estoque;
        }
        return index;
    }
    deletaQuantidadeInformada(ID: number, quantidade: number): Estoque | undefined{
        const estoque = this.consultaEstoquePorId(ID);
        if (estoque) {
            estoque.quantidade - quantidade;
            return estoque;
        }
    }
    atualizaQuantidadeEstoque(ID: number, quantidade: number): Estoque | undefined {
        const estoque = this.consultaEstoquePorId(ID);
        if (estoque) {
            estoque.quantidade += quantidade;
            return estoque;
        }
        return undefined; 
    }
}