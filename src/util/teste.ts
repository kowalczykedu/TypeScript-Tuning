import { buscarPorNome } from "./buscarPorNome";
import { motoresPreDefinidos } from "../data/motoresData";
import { catalogo } from "../data/pecasData";
import { TipoPeca } from "../model/TipoPeca";

const motor = buscarPorNome(motoresPreDefinidos, "Boxer 1600 (Fusca)");
console.log(motor?.getNome()); 

const peca = buscarPorNome(catalogo.get(TipoPeca.Turbina)!, "Turbina Média");
console.log(peca?.getNome());

const motor2 = buscarPorNome(motoresPreDefinidos, "Boxer 1600");
console.log(motor2?.getNome()); 

