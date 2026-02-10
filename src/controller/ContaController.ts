import { Conta } from "../model/Conta";
import { ContaCorrente } from "../model/ContaCorrente";
import { ContaRepository } from "../repository/ContaRepository";
import { colors } from "../util/Colors";
import { formatarMoeda } from "../util/Currency";

export class ContaController implements ContaRepository {

    // Atributos

    private listaContas = new Array<Conta>();
    public numero: number = 0;

    // Métodos do CRUD

    procurarPorNumero(numero: number): void {
        const buscaConta = this.buscarNoArray(numero);

        if (buscaConta !== null) {
            buscaConta.visualizar();
        } else {
            console.log(colors.fg.red, `\nA Conta número ${numero} não foi encontrada!`, colors.reset);
        }
    }

    listarTodas(): void {
        for (let conta of this.listaContas) {
            conta.visualizar();
        }
    }

    procurarPorTitular(titular: string): void {
        // Filtragem dos dados
        const buscaPorTitular = this.listaContas.filter(conta =>
            conta.titular.toUpperCase().includes(titular.toUpperCase())
        );

        // Listagem dos dados filtrados
        if (buscaPorTitular.length > 0) {
            console.log(colors.fg.green, `\nLista de Contas com o Nome de Titular: ${titular}:`, colors.reset);
            buscaPorTitular.forEach(conta => conta.visualizar());
        } else {
            console.log(colors.fg.red, `\nNenhuma conta foi encontrada com nome de Titular: ${titular}:`, colors.reset);
        }
    }

    cadastrar(conta: Conta): void {
        this.listaContas.push(conta);
        console.log(colors.fg.green, `\nA Conta número ${conta.numero} foi cadastrada com sucesso!`, colors.reset);
    }

    atualizar(conta: Conta): void {
        const buscaConta = this.buscarNoArray(conta.numero);

        if (buscaConta !== null) {
            this.listaContas[this.listaContas.indexOf(buscaConta)] = conta;
            console.log(colors.fg.green,
                `\nA Conta número ${conta.numero} foi atualizada com sucesso!`, colors.reset);
        } else {
            console.log(colors.fg.red,
                `\nA Conta número ${conta.numero} não Encontrada! `, colors.reset);
        }
    }

    deletar(numero: number): void {
        const buscaConta = this.buscarNoArray(numero);

        if (buscaConta !== null) {
            this.listaContas.splice(this.listaContas.indexOf(buscaConta), 1);
            console.log(colors.fg.green,
                `\nA Conta número ${numero} foi deletada com sucesso!`, colors.reset);
        } else {
            console.log(colors.fg.red,
                `\nA Conta ${numero} não foi encontrada! `, colors.reset);
        }
    }

    // Métodos Bancários

    sacar(numero: number, valor: number): void {
        const buscaConta = this.buscarNoArray(numero);

        if (buscaConta !== null) {
            console.log(`Saldo atual: ${formatarMoeda(buscaConta.saldo)}`);
            console.log(`Valor do Saque: ${formatarMoeda(valor)}`);

            if (buscaConta.sacar(valor) === true)
                console.log(colors.fg.green,
                    `O saque no valor de ${formatarMoeda(valor)} na Conta Número: ${numero} foi realizado com sucesso!`,
                    colors.reset);
            console.log(`Saldo atualizado: ${formatarMoeda(buscaConta.saldo)}`);

        } else {
            console.log(colors.fg.red,
                `A Conta número: ${numero} não foi encontrada! `,
                colors.reset);
        }
    }

    depositar(numero: number, valor: number): void {
        const buscaConta = this.buscarNoArray(numero);

        if (buscaConta !== null) {
            buscaConta.depositar(valor);
            console.log(colors.fg.green,
                `O depósito no valor de ${formatarMoeda(valor)} na Conta Número: ${numero} foi realizado com sucesso!`,
                colors.reset);
        } else {
            console.log(colors.fg.red,
                `A Conta número: ${numero} não foi encontrada! `,
                colors.reset);
        }
    }

    transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
        const buscaContaOrigem = this.buscarNoArray(numeroOrigem);
        const buscaContaDestino = this.buscarNoArray(numeroDestino);

        if (buscaContaOrigem !== null && buscaContaDestino !== null) {

            if (buscaContaOrigem.sacar(valor) === true) {
                buscaContaDestino.depositar(valor);

                console.log(colors.fg.green,
                    `\nA transferência no valor de ${formatarMoeda(valor)} da Conta número: ${numeroOrigem} para a Conta número: ${numeroDestino} foi efetuada com sucesso! `,
                    colors.reset)
            }
        } else {
            console.log(colors.fg.red,
                `A Conta de Origem ${numeroOrigem} e/ou Conta de Destino ${numeroDestino} não foram encontradas! `,
                colors.reset)
        }
    }

    // Métodos Auxiliares
    public gerarNumero(): number {
        return ++this.numero;
    }

    public buscarNoArray(numero: number): Conta | null {
        for (let conta of this.listaContas) {
            if (conta.numero === numero) {
                return conta;
            }
        }
        return null;
    }
}