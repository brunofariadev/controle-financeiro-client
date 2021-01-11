import { Sessao } from '../../sessoes/shared/sessao.model';

export class Receita {
    public id: string;
    public tipoDaReceita: number;
    public sessaoId: string;
    public descricao: string;
    public formaDePagamento: number;
    public valorAReceber: number;
    public foiPago: boolean;
    public dataDoPagamento: string;
    public dataDoVencimento: string;
    public observacao: string;
    public sessao: Sessao;

    static tipos = {
        1: "Sessão",
        2: "Avulso"
    };

    static formasDePagamento = {
        1: "Dinheiro",
        2: "Cartão de crédito",
        3: "Cartão de débito",
        4: "Transferência bancária"
    };

    get DescricaoDaSituacao(): string {
        return this.foiPago ? "Pago" : "Não pago";
    }
}