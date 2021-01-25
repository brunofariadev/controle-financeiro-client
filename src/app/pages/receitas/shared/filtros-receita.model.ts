import { Paginacao } from "src/app/shared/models/paginacao.model";

export class FiltrosReceita extends Paginacao {
    public clienteId: string;
    public dataInicio: string;
    public dataFim: string;
    public situacao: number;

    static situacoes = {
        1: "Pago",
        2: "Não pago"
    }
}