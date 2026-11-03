export class NomeDuplicadoError extends Error {
    public readonly entradaRecebida: string;

    constructor(mensagem: string, entradaRecebida: string) {
        super(mensagem);
        this.name = "NomeDuplicadoError";
        this.entradaRecebida = entradaRecebida;
    }
}