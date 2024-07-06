export class Estoque{
    ID: number;
    modalidadeID: number;
    quantidade: number;
    precoVenda: number;


    constructor(ID: number, modalidadeID:number, quantidade: number, precoVenda: number){
        this.ID = ID;
        this.modalidadeID = modalidadeID;
        this.quantidade = quantidade;
        this.precoVenda = precoVenda;
    }
}