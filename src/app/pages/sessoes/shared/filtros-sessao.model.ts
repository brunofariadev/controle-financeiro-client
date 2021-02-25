import { Paginacao } from "src/app/shared/models/paginacao.model";

export class FiltrosSessao extends Paginacao {
    public clienteId: string;
    public dataInicio: string;
    public dataFim: string;
}