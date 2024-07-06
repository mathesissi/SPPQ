import { Modalidade } from "../model/ModalidadePaes";
import { ModalidadeRepository } from "../repository/ModalidadePaesRepository";

let currentId = 1;

function gerarId(): number {
    return currentId++;
}

export class ModalidadeService{
    modalidadeRepository: ModalidadeRepository = new ModalidadeRepository();
    
    cadastrarModalidade(modalidadeInfo: any): Modalidade{
        const { nome, vegano } = modalidadeInfo;
        if(!nome || !vegano === undefined){
            throw new Error("Informacoes incompletas")
        }
        const modalidadeEncontrada = this.consultarModalidade(undefined, nome);
        if(modalidadeEncontrada){
            throw new Error("Modalidade já cadastrada!");
        }
        const novaModalidade = new Modalidade(gerarId(), nome, vegano);
        this.modalidadeRepository.insereModalidade(novaModalidade);
        return novaModalidade;
    }

    consultarModalidade(id: any, nome:any):Modalidade|undefined{
        if(id && nome){
            console.log("Com ID e Name");
            const idNumber: number = parseInt(id, 10);
            return this.modalidadeRepository.listarModalidadePorNomeId(idNumber,nome);
            
        }else if(id){
            console.log("Com ID");
            const idNumber: number = parseInt(id, 10);
            return this.modalidadeRepository.RecuperaPorId(idNumber);

        }else if(nome){
            console.log("Nome");
            return this.modalidadeRepository.listarModalidadePorNome(nome);
        }
        console.log(id)
        return undefined;
    }

    getModalidade(ordem:any):Modalidade[]{
        if(ordem === "desc"){
            return this.modalidadeRepository.listarTodasModalidades().sort((a,b) => b.ID - a.ID);
        }
        return this.modalidadeRepository.listarTodasModalidades().sort((a,b) => a.ID - b.ID);
    }


    deletarModalidade(id: any) {
        console.log("ID recebido para deleção:", id);
        const modalidade = this.consultarModalidade(id, undefined);
        if (!modalidade) {
            console.log("Modalidade não encontrada para o ID:", id);
            throw new Error("Modalidade não encontrada");
        }
        console.log("Modalidade encontrada:", modalidade);
        this.modalidadeRepository.deletaModalidade(modalidade);
    }
    atualizaModalidade(modalidadeData: any): Modalidade {
        console.log("Dados recebidos para atualização:", modalidadeData);
        const {ID, nome, vegano } = modalidadeData;
        if(!ID || !nome || typeof vegano === 'undefined'){
            throw new Error("Informações incompletas");
        }

        let modalidadeEncontrada = this.consultarModalidade(ID,undefined);
        if(!modalidadeEncontrada){
            throw new Error("Modalidade não cadastrada!");
        }
        modalidadeEncontrada.ID = ID;
        modalidadeEncontrada.nome = nome;
        modalidadeEncontrada.vegano =vegano;
        this.modalidadeRepository.atualizaModalidade(modalidadeEncontrada);
        return modalidadeEncontrada;
    }
}