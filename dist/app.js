"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ModalidadePaesController_1 = require("./controller/ModalidadePaesController");
const EstoqueController_1 = require("./controller/EstoqueController");
//import{ cadastrarVenda, consultarVenda } from "./controller/VendasPaesController";
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3050;
const app = (0, express_1.default)();
app.use(express_1.default.json());
function logInfo() {
    console.log(`API em execucao no URL: http:localhost:?${PORT}`);
}
app.listen(PORT, logInfo);
app.get("/api/modalidade/todas", ModalidadePaesController_1.listaModalidade);
app.post("/api/modalidade", ModalidadePaesController_1.cadastrarModalidade);
app.put("/api/modalidade", ModalidadePaesController_1.atualizarModalidade);
app.delete("/api/modalidade", ModalidadePaesController_1.deletarModalidade);
app.get("/api/modalidade", ModalidadePaesController_1.pesquisarModalidade);
app.post("/api/estoque", EstoqueController_1.cadastrarEstoque);
app.get("/api/estoque/todos", EstoqueController_1.ListarTodoEstoques);
app.get("/api/estoque", EstoqueController_1.RecuperaPorId);
app.put("/api/estoque", EstoqueController_1.atualizaQuantidadeEstoque);
app.delete("/api/estoque", EstoqueController_1.deletarQuantidadeEmEstoque);
// app.post("/api/venda", cadastrarVenda);
// app.get("/api/venda", consultarVenda);
