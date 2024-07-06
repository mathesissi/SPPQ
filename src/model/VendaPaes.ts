export class ItemVenda{
    estoquePaesID: number;
    quantidade: number;
    nome: string;
    
    constructor(estoquePaesId: number, quantidade:number, nome:string){
        this.estoquePaesID = estoquePaesId;
        this.quantidade = quantidade;
        this.nome = nome;
    }
}

export class VendaPaes{
    ID: number;
    cpfCliente: string;
    valorTotal: number;
    itens: ItemVenda[];  

    constructor(ID: number, cpf: string, total: number, itens: ItemVenda[]){
        this.ID = ID;
        this.cpfCliente = cpf;
        this.valorTotal = total;
        this.itens = itens
    }
}