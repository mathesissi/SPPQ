import { Request, Response } from "express";
import { VendaPaesService } from "../service/VendasService";

const vendaPaesService = new VendaPaesService();

export function cadastrarVenda(req: Request, res: Response) {
    try {
        const novaVenda = vendaPaesService.cadastrarVenda(req.body)
        res.status(200).json(
            {
                mensagem: "Venda realizada com sucesso!",
                venda: novaVenda
            }
        );
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}
export function consultarVenda(req: Request, res: Response) {
    try {
        const venda = vendaPaesService.consultarVenda(Number(req.params.id));
        if (venda) {
            res.status(200).json(venda);
        } else {
            res.status(404).json({ message: "Venda não encontrada" });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}