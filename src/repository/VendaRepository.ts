import { VendaPaes } from "../model/Venda";
import { getVendaList } from "../global/database";
export class VendaPaesRepository {
    VendaList: VendaPaes[] = getVendaList();

    insereVenda(venda: VendaPaes) {
        this.VendaList.push(venda);
    }
    consultaVendaPorId(id: number): VendaPaes | undefined {
        return this.VendaList.find(venda => venda.ID === id);
    }
}