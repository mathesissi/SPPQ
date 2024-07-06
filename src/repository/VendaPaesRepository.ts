import { VendaPaes } from "../model/VendaPaes";

export class VendaPaesRepository {
    VendaList: VendaPaes[] = [];

    insereVenda(venda: VendaPaes) {
        this.VendaList.push(venda);
    }

    RecuperaPorId(id: number): VendaPaes | undefined {
        return this.VendaList.find(venda => venda.ID === id);
    }

    ListarTodasVendas(): VendaPaes[] {
        return this.VendaList;
    }
}
