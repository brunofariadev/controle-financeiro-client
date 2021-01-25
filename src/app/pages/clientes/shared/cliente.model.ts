import { Endereco } from './endereco.model';

export class Cliente {
    public id: string;
    public nome: string;
    public idade: number;
    public sexo: number;
    public dataDeNascimento: string;
    public estadoCivil: number;
    public rg: string;
    public cpf: string;
    public escolaridade: number;
    public profissao: string;
    public telefone: number;
    public valorSessao: number;
    public email: string;
    public endereco: Endereco;
    public observacao: string;

    static sexoEnum = {
        1: "Masculino",
        2: "Feminino",
        3: "Outros"
    }

    static estadoCivilEnum = {
        1: 'Solteiro',
        2: 'Casado',
        3: 'Divorciado',
        4: 'Separado',
        5: 'Viúvo'
    }

    static escolaridadeEnum = {
        1: 'Educacão Básica',
        2: 'Educacão Infantil',
        3: 'Ensino Fundamental',
        4: 'Ensino Médio',
        5: 'Educão Superior'
    }
}

