export class Modalidade{
   ID: number;
   nome: string;
   vegano: boolean;  

    constructor(ID: number, nome: string, vegano: boolean){
        this.ID = ID;
        this.nome = nome;
        this.vegano= vegano
    }
}
