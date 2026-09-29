export class EscolhaInvalidaError extends Error {
    public readonly entradaRecebida: string;

    constructor(mensagem: string, entradaRecebida: any) {
        super(mensagem);
        this.name = "EscolhaInvalidaError";
        this.entradaRecebida = entradaRecebida;
    }
}