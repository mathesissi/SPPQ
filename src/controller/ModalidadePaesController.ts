import { Request, Response } from "express";
import { ModalidadeService } from "../service/ModalidadePaesService";

const modalidadeService = new ModalidadeService();

export function cadastrarModalidade(req: Request, res: Response){
    try{
        const novaModalidade = modalidadeService.cadastrarModalidade(req.body);
        res.status(201).json(
            {
                mensagem:"Modalidade adcionada com sucesso!",
                modalidade:novaModalidade
            }
            );
    }catch (error: any){
        res.status(400).json({ message: error.message});
    }
}
export function atualizarModalidade(req: Request, res: Response){
    try{
        const novaModalidade = modalidadeService.atualizaModalidade(req.body)
        res.status(201).json(
            {
                mensagem:"Modalidade alterada com sucesso!",
                modalidade:novaModalidade
            }
            );
    }catch (error: any){
        res.status(400).json({ message: error.message})
    }
}
export function deletarModalidade(req: Request, res:Response){
    try{
        modalidadeService.deletarModalidade(req.query.ID);
        res.status(202).json({message:"Modalidade deletada com sucesso!"});
    }catch (error: any){
        res.status(400).json({ message: error.message})
    }
}
export function pesquisarModalidade(req: Request, res: Response){
    try {
        const modalidade = modalidadeService.consultarModalidade(req.query.ID, req.query.nome);
        if(modalidade){
        res.status(200).json(
            {
                mensagem:"Modalidade encontrada com sucesso!",
                modalidade: modalidade
            }
            );
        }else{
            res.status(404).json({mensagem:"Modalidade não encontrada."});
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
}

export function listaModalidade(req: Request, res: Response){
    try {
        res.status(200).json(modalidadeService.getModalidade(req.query.ordem));
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
}