export class FiltrosReceita {
    public clienteId: string;
    public dataInicio: string;
    public dataFim: string;
    public situacao: number;

    static situacoes = {
        1: "Pago",
        2: "Não pago"
    }
}