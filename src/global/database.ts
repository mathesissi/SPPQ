import { Modalidade } from "../model/ModalidadePaes";
import { Estoque } from "../model/EstoquePaes";
import { VendaPaes } from "../model/Venda";

const modalidadeList: Modalidade[] = [];
const estoqueList: Estoque[] = [];
const vendaList: VendaPaes[] = [];

export function getModalidadeList() {
    return modalidadeList;
}

export function getEstoqueList() {
    return estoqueList;
}
export function getVendaList() {
    return vendaList;
}
