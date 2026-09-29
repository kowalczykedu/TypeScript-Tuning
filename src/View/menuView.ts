import teclado from "readline-sync";
import { OficinaController } from "../controller/oficinaController";

export function perguntar(pergunta: string): string {
    return teclado.question(pergunta);
};

const controller: OficinaController = new OficinaController;
const motores = controller.getMotores();

for (const motor of motores) {
    console.log(`
\x1b[34m${motor.getNome()}\x1b[0m
Quantidade de Cilindros = \x1b[32m${motor.getCilindros()}\x1b[0m
Potência = \x1b[32m${Math.trunc(motor.getPotenciaAtual())}cv\x1b[0m
Limite = \x1b[31m${Math.trunc(motor.getLimiteAtual())}cv\x1b[0m
Pressão de Turbina Base = \x1b[31m${motor.getPressaoBase()}kg\x1b[0m`);
};