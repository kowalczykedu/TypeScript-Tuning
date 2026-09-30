export class EscolhaInvalidaError extends Error {
    public readonly entradaRecebida: string | number;

    constructor(mensagem: string, entradaRecebida: string | number) {
        super(mensagem);
        this.name = "EscolhaInvalidaError";
        this.entradaRecebida = entradaRecebida;
    }
}