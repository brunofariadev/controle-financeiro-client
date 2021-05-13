import { Paginacao } from "src/app/shared/models/paginacao.model";

export class FiltrosReceita extends Paginacao {
    public clienteId: string;
    public tipoDeFiltroPeriodoReceita: number;
    public dataInicioVencimento: string;
    public dataFimVencimento: string;
    public dataInicioSessao: string;
    public dataFimSessao: string;
    public dataInicioPagamento: string;
    public dataFimPagamento: string;
    public situacao: number;

    static situacoes = {
        1: "Pago",
        2: "Não pago"
    }

    static tiposFiltroPeriodos = {
        1: "Data de Vencimento",
        2: "Data da Sessão",
        3: "Data do Pagamento"
    }
}