import { Request, Response } from "express";
import { EstoqueService } from "../service/EstoquePaesService";

const estoqueService = new EstoqueService();

export function cadastrarEstoque(req: Request, res: Response) {
    try {
        const novoEstoque = estoqueService.cadastrarEstoque(req.body);
        res.status(201).json(
            {
                mensagem: "Item adcionado ao estoque com sucesso!"
            }
        );
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}
export function ListarTodoEstoques(req: Request, res: Response) {
    try {
        res.status(200).json(estoqueService.getEstoque(req.query.ordem));
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}
export function RecuperaPorId(req: Request, res: Response) {
    try {
        const estoque = estoqueService.consultarEstoque(req.query.ID);
        if (estoque) {
            res.status(200).json(
                {
                    mensagem: "Estoque encontrado com sucesso!",
                    estoque: estoque
                }
            );
        } else {
            res.status(404).json({ menssagem: "Estoque não encontrado" });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}
export function atualizaQuantidadeEstoque(req: Request, res: Response) {
    try {
        const { ID, quantidade } = req.body;
        const estoqueAtualizado = estoqueService.atualizaQuantidadeEmEstoque(ID, quantidade);
        res.status(202).json({
            mensagem: "Quantidade do estoque atualizada com sucesso!",
            estoque: estoqueAtualizado
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export function atualizaEstoque(req: Request, res: Response) {
    try {
        const { ID, modalidadeID, quantidade, precoVenda } = req.body;
        const estoqueAtualizado = estoqueService.atualizaEstoque(ID, modalidadeID, quantidade, precoVenda);
        res.status(202).json({
            mensagem: "Estoque atualizado com sucesso!",
            estoque: estoqueAtualizado
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export function deletarQuantidadeEmEstoque(req: Request, res: Response) {
    try {
        const { ID, quantidade } = req.body;
        const estoqueAtualizado = estoqueService.deletarQuantidadeEmEstoque(ID, quantidade);
        res.status(202).json({
            mensagem: "Quantidade subtraída com sucesso!",
            estoque: estoqueAtualizado
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}