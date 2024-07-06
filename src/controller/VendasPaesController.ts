import { Request, Response } from "express";
import { VendaPaesService } from "../service/VendasPaesService";

const vendaService = new VendaPaesService();

export function cadastrarVenda(req: Request, res: Response) {
    try {
        const novaVenda = vendaService.cadastrarVenda(req.body);
        res.status(201).json({
            mensagem: "Venda cadastrada com sucesso!",
            venda: novaVenda
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}
export function consultarVenda(req: Request, res: Response) {
    try {
        const venda = vendaService.consultarVenda(parseInt(req.params.id));
        if (venda) {
            res.status(200).json(venda);
        } else {
            res.status(404).json({ mensagem: "Venda não encontrada." });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}
