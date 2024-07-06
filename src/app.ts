import express from "express";
import { cadastrarModalidade, atualizarModalidade, deletarModalidade, pesquisarModalidade, listaModalidade} from "./controller/ModalidadePaesController";
import { cadastrarEstoque, atualizaQuantidadeEstoque, deletarQuantidadeEmEstoque, RecuperaPorId, ListarTodoEstoques } from "./controller/EstoqueController";
import { cadastrarVenda, consultarVenda } from "./controller/VendasPaesController";
const PORT = process.env.PORT ?? 3050;

const app = express();
app.use(express.json());

function lofInfo(){
    console.log(`API em execucao no URL: http:localhost:?${PORT}`);
}

app.listen(PORT, lofInfo);

app.get("/api/modalidade/todas", listaModalidade);
app.post("/api/modalidade", cadastrarModalidade);
app.put("/api/modalidade", atualizarModalidade); 
app.delete("/api/modalidade", deletarModalidade);
app.get("/api/modalidade", pesquisarModalidade);
app.post("/api/estoque", cadastrarEstoque);
app.get("/api/estoque/todos", ListarTodoEstoques);
app.get("/api/estoque", RecuperaPorId );
app.put("/api/estoque", atualizaQuantidadeEstoque);
app.delete("/api/estoque", deletarQuantidadeEmEstoque);
app.post("/api/venda", cadastrarVenda);
app.get("/api/venda", consultarVenda);
