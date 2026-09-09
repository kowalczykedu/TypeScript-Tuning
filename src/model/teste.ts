abstract class Animal {
    protected nome: string;

    constructor(nome: string) {
        this.nome = nome;
    }

    fazerBarulho(): void {
        console.log(`Está fazendo barulho!`);
    }

}

class Vaca extends Animal {
    fazerBarulho(): void {
        console.log(`${this.nome} Está mugindo!`);
    }
}

class Cachorro extends Animal {
    fazerBarulho(): void {
        console.log(`${this.nome} Está latindo!`);
    }
}

const vaca = new Vaca("Vaca");
vaca.fazerBarulho();

const cachorro = new Cachorro("Nego Ney");
cachorro.fazerBarulho();