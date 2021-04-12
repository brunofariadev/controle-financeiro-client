import { Cliente } from '../../clientes/shared/cliente.model';

export class Sessao {
    public id: string;
    public cliente: Cliente;
    public clienteId: string;
    public dataDaSessao: string;
    public horaDaSessao: string;

    get NomeDoCliente(): string {
        return this.cliente.nome;
    }

    get DescricaoCompleta(): string {
        return `${this.cliente.nome} - ${this.dataDaSessao}`;
    }
}