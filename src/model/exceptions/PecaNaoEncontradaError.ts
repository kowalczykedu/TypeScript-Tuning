export class PecaNaoEncontradaError extends Error {
    public readonly nomePeca: string;
    public readonly slot: string;

    constructor(mensagem: string, nomePeca: string, slot: string) {
        super(mensagem);
        this.name = "PecaNaoEncontradaError";
        this.nomePeca = nomePeca;
        this.slot = slot;
    }
}