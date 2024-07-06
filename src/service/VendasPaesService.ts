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


    consultarVenda(id: any): VendaPaes | undefined {
        const idNumber: number = parseInt(id, 10);
        return this.vendaRepository.RecuperaPorId(idNumber);
    }
}
