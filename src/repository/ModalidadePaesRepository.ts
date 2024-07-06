import { Modalidade } from "../model/ModalidadePaes";

export class ModalidadeRepository{
    ModalidadeList: Modalidade[] = [];

    insereModalidade(modalidade: Modalidade){
        this.ModalidadeList.push(modalidade);
    }
    RecuperaPorId(id: number): Modalidade|undefined{
        return this.ModalidadeList.find(modalidade =>modalidade.ID === id);
    }
    listarModalidadePorNome(nome: string): Modalidade|undefined{
        return this.ModalidadeList.find(modalidade => modalidade.nome === nome);
    }
    listarModalidadePorNomeId(id: number, nome: string): Modalidade|undefined{
        return this.ModalidadeList.find(modalidade => modalidade.ID === id &&  modalidade.nome === nome);
    }
       listarTodasModalidades():Modalidade[]{
        return this.ModalidadeList;
    }
    
    atualizaModalidade(modalidade:Modalidade): number{
        const index = this.ModalidadeList.indexOf(modalidade);
        if(index !== -1){
            this.ModalidadeList[index] = modalidade;
        }
        return index;
        
    }
     deletaModalidade(modalidade: Modalidade){
        const index = this.ModalidadeList.indexOf(modalidade);
        if (index !== -1) {
            this.ModalidadeList.splice(index, 1);
        }
    }
}