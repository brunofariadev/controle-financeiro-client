import { InMemoryDbService } from "angular-in-memory-web-api";

import { Cliente } from "./pages/clientes/shared/cliente.model";
import { Endereco } from './pages/clientes/shared/endereco.model';
import { Receita } from './pages/receitas/shared/receita.model';
import { Sessao } from './pages/sessoes/shared/sessao.model';

export class InMemoryDatabase implements InMemoryDbService {

    createDb() {
        let endereco = new Endereco();
        endereco.cidade = "Goiânia";
        endereco.estado = "Goiás";
        endereco.cep = "74210030";
        endereco.bairro = 'Setor Bueno';
        endereco.numero = '575';
        endereco.logradouro = 'Rua t27, Q44';

        let clientes: Cliente[] = [
            {
                id: '1',
                nome: "Bruno Oliveira de Faria Tolentino",
                cpf: "04335491140",
                dataDeNascimento: "20/11/1991",
                email: "brunogyn1@gmail.com",
                rg: '5411612',
                sexo: 1,
                telefone: 62985568460,
                valorSessao: 60,
                observacao: "Lorem ashdajs akjsdkasd askjdddd qweqwe q dashd",
                endereco: endereco,
                escolaridade: 1,
                estadoCivil: 1,
                idade: 28,
                profissao: "Desenvolvedor"
            },
            {
                id: '2',
                nome: "Diogo Souza Carvalho",
                cpf: "14324461775",
                dataDeNascimento: "03/03/1959",
                email: "DiogoSouzaCarvalho@jourrapide.com",
                rg: '5411612',
                sexo: 1,
                telefone: 3136379480,
                valorSessao: 100,
                observacao: "",
                endereco: null,
                escolaridade: 1,
                estadoCivil: 1,
                idade: 28,
                profissao: "Desenvolvedor"
            },
            {
                id: '3',
                nome: "Bruno Oliveira de Faria",
                cpf: "04335491140",
                dataDeNascimento: "20/11/1991",
                email: "brunogyn1@gmail.com",
                rg: '5411612',
                sexo: 1,
                telefone: 62985568460,
                valorSessao: 60,
                observacao: "",
                endereco: null,
                escolaridade: 1,
                estadoCivil: 1,
                idade: 28,
                profissao: "Desenvolvedor"
            },
            {
                id: '4',
                nome: "Bruno Oliveira de Faria",
                cpf: "04335491140",
                dataDeNascimento: "20/11/1991",
                email: "brunogyn1@gmail.com",
                rg: '5411612',
                sexo: 1,
                telefone: 62985568460,
                valorSessao: 60,
                observacao: "",
                endereco: null,
                escolaridade: 1,
                estadoCivil: 1,
                idade: 28,
                profissao: "Desenvolvedor"
            }
        ];

        // let sessoes: Sessao[] = [
        //     { id: 1, cliente: clientes[0], dataDaSessao: "18/09/2020" } as Sessao,
        //     { id: 2, cliente: clientes[0], dataDaSessao: "25/09/2020" } as Sessao,
        //     { id: 3, cliente: clientes[0], dataDaSessao: "02/10/2020" } as Sessao,
        //     { id: 4, cliente: clientes[0], dataDaSessao: "09/10/2020" } as Sessao
        // ];

        // let receitas: Receita[] = [
        //     { id: 1, tipo: "Sessao", sessaoId: sessoes[0].id, sessao: sessoes[0], valorAReceber: 90.00, formaDePagamento: "Dinheiro", foiPago: true, dataDoPagamento: "19/09/2020" } as Receita,
        //     { id: 2, tipo: "Sessao", sessaoId: sessoes[1].id, sessao: sessoes[1], valorAReceber: 90.00, foiPago: false } as Receita,
        //     { id: 3, tipo: "Sessao", sessaoId: sessoes[2].id, sessao: sessoes[2], valorAReceber: 90.00, foiPago: false } as Receita,
        //     { id: 4, tipo: "Sessao", sessaoId: sessoes[3].id, sessao: sessoes[3], valorAReceber: 90.00, foiPago: false } as Receita
        // ];

        return { clientes };
    }
}