import { ContaController } from './src/controller/ContaController';
import { ContaCorrente } from './src/model/ContaCorrente';
import { ContaPoupanca } from './src/model/ContaPoupanca';
import { colors } from './src/util/Colors';
import { Input } from './src/util/Input';
import { formatarMoeda } from './src/util/Currency';


// Cria um Objeto Global da Classe ContaController
const contas = new ContaController();

// Cria um array contendo os tipos de conta
const tipoContas = ['Conta Corrente', 'Conta Poupanca'];

export function main() {
    let opcao: number;

    //Chamada para a criação de contas testes para validar a aplicação
    criarContasTeste();

    // Criação do Menu
    while (true) {
        console.log(colors.fg.magenta,
            "********************************************************");
        console.log("              BANCO DO BRAZIL COM Z                      ");
        console.log("*********************************************************");
        console.log("           1 - Criar Conta                               ");
        console.log("           2 - Listar todas as Contas                    ");
        console.log("           3 - Buscar Conta por Numero                   ");
        console.log("           4 - Atualizar Dados da Conta                  ");
        console.log("           5 - Apagar Conta                              ");
        console.log("           6 - Sacar                                     ");
        console.log("           7 - Depositar                                 ");
        console.log("           8 - Transferir valores entre Contas           ");
        console.log("           9 - Buscar Conta por Nome do Titular          ");
        console.log("           0 - Sair                                      ");
        console.log("*********************************************************",
            colors.reset);

        console.log("Entre com a opção desejada: ");
        opcao = Input.questionInt("");

        if (opcao === 0) {
            console.log(colors.fg.greenstrong,
                "\nBanco do Brazil com Z - O seu Futuro começa aqui! ",
                colors.reset, "");
            sobreProjeto();
            process.exit(0);
        }

        switch (opcao) {
            case 1:
                console.log(colors.fg.whitestrong,
                    "\n\nCriar Conta\n\n",
                    colors.reset);
                criarConta();
                keyPress();
                break;

            case 2:
                console.log(colors.fg.whitestrong,
                    "\n\nListar todas as Contas\n\n",
                    colors.reset);
                contas.listarTodas();
                keyPress();
                break;

            case 3:
                console.log(colors.fg.whitestrong,
                    "\n\nConsultar dados da Conta - por número\n\n",
                    colors.reset);
                buscarContaPorNumero();
                keyPress();
                break;

            case 4:
                console.log(colors.fg.whitestrong,
                    "\n\nAtualizar Dados da Conta\n\n",
                    colors.reset);
                atualizarConta();
                keyPress();
                break;

            case 5:
                console.log(colors.fg.whitestrong,
                    "\n\nApagar uma Conta\n\n",
                    colors.reset);
                deletarContaPorNumero();
                keyPress();
                break;

            case 6:
                console.log(colors.fg.whitestrong,
                    "\n\nSaque\n\n",
                    colors.reset);
                sacarConta();
                keyPress();
                break;

            case 7:
                console.log(colors.fg.whitestrong,
                    "\n\nDepósito\n\n",
                    colors.reset);
                depositarConta();
                keyPress();
                break;

            case 8:
                console.log(colors.fg.whitestrong,
                    "\n\nTransferir valores entre Contas\n\n",
                    colors.reset);
                transferirEntreContas();
                keyPress();
                break;
            case 9:
                console.log(colors.fg.whitestrong,
                    "\n\nBuscar Conta por Nome do Titular\n\n",
                    colors.reset);
                procurarPorTitular();
                keyPress();
                break;

            default:
                console.log(colors.fg.redstrong,
                    "Operação inválida! Tente novamente.",
                    colors.reset);
                keyPress();
                break;
        }
    }
}

// Função para cadastrar dados e chamar a Controladora

// Opção 1: Criar uma nova Conta

function criarConta() {
    console.log("Digite o número da agência: ");
    const agencia = Input.questionInt("");

    console.log("Digite o nome do titular: ");
    const titular = Input.question("");

    console.log("Selecione o tipo da conta: ");
    const tipo = Input.keyInSelect(tipoContas, "", { cancel: false }) + 1;

    console.log("Digite o saldo da conta: ");
    const saldo = Input.questionFloat("");

    switch (tipo) {
        case 1: //Cria um objeto da classe Conta Corrente
            console.log("Digite o Limite da Conta: ");
            const limite = Input.questionFloat("");
            contas.cadastrar(new ContaCorrente(
                contas.gerarNumero(), agencia, titular, tipo, saldo, limite));
            break;

        case 2: //Cria um objeto da classe Conta Poupança
            console.log("Digite o dia do aniversário da Conta");
            const aniversario = Input.questionInt("");
            contas.cadastrar(new ContaPoupanca(
                contas.gerarNumero(), agencia, titular, tipo, saldo, aniversario));
            break;
    }
}

// Opção 2: Veja Case 2 do Menu

// Opção 3: Busca uma Conta pelo número

function buscarContaPorNumero(): void {
    console.log("Digite o número da Conta");
    const numero = Input.questionInt("");
    contas.procurarPorNumero(numero);
}


/* Opção 4: Atualiza os dados de uma conta existente e
* permite manter os valores atuais pressionando enter
*/

function atualizarConta(): void {
    console.log("Digite o número da Conta");
    const numero = Input.questionInt("");

    const conta = contas.buscarNoArray(numero);

    if (conta !== null) {

        // Guarda os valores atuais da conta 
        let agencia: number = conta.agencia;
        let titular: string = conta.titular;
        const tipo: number = conta.tipo;
        let saldo: number = conta.saldo;

        // Atualização da Agência
        console.log(`\nAgência Atual: ${agencia}`);
        console.log("Digite o número da nova Agência: ");
        console.log(colors.fg.yellowstrong,
            "\nPressione ENTER para manter o valor atual",
            colors.reset);
        agencia = Input.questionInt("", { defaultInput: agencia });

        // Atualização do Titular
        console.log(`\nTitular atual: ${titular}`);
        console.log("Digite o novo nome do titular: ");
        console.log(colors.fg.yellowstrong,
            "Pressione ENTER para manter o valor atual",
            colors.reset);
        titular = Input.question("", { defaultInput: titular });

        // Atualização do Saldo
        console.log(`\nSaldo Atual: ${saldo}`);
        console.log("Digite o novo valor do saldo: ");
        console.log(colors.fg.yellowstrong,
            "Pressione ENTER para manter o valor atual",
            colors.reset);
        saldo = Input.questionFloat("", { defaultInput: saldo });

        // Atualização dentro do Tipo

        switch (tipo) {
            case 1: { //Conta Corrente
                let limite: number = (conta as ContaCorrente).limite;

                // Atualização do limite
                console.log(`\nLimite Atual: ${formatarMoeda(limite)}`);
                console.log("Digite o novo valor do limite: ");
                console.log(colors.fg.yellowstrong,
                    "Pressione ENTER para manter o valor atual",
                    colors.reset);
                limite = Input.questionFloat("", { defaultInput: limite });

                // Chamando o método de atualizar 
                contas.atualizar(new ContaCorrente(
                    numero, agencia, titular, tipo, saldo, limite));
                break;

            } case 2: { //Conta Poupança
                let aniversario: number = (conta as ContaPoupanca).aniversario;

                //Atualização do aniversário
                console.log(`\nAniversário Atual: ${aniversario}`);
                console.log("Digite o novo dia de aniversário: ");
                console.log(colors.fg.yellowstrong,
                    "\nPressione ENTER para manter o valor atual",
                    colors.reset);
                aniversario = Input.questionInt("", { defaultInput: aniversario });

                // Chamando o método de atualizar
                contas.atualizar(new ContaPoupanca(
                    numero, agencia, titular, tipo, saldo, aniversario));
                break;
            }
        }

    } else {
        console.log(colors.fg.red,
            `A Conta número ${numero} não existe!`,
            colors.reset);
    }
}

// Opção 5: Deletar uma Conta pelo Número

function deletarContaPorNumero(): void {
    console.log("Digite o número da Conta");
    const numero = Input.questionInt("");

    const conta = contas.buscarNoArray(numero);

    if (conta !== null) {
        console.log(colors.fg.whitestrong,
            `Deseja prosseguir com a exclusão da conta ${numero} (Sim/Não)? `,
            colors.reset);
        let confirmacao = Input.question("").toUpperCase();

        if (confirmacao === "SIM") {
            contas.deletar(numero);
        } else {
            console.log(colors.fg.red, "Operação cancelada!",
                colors.reset);
        }
    } else {
        console.log(colors.fg.red,
            `A Conta número ${numero} não foi encontrada! `,
            colors.reset);
    }
}

// Opção 6: Sacar de uma Conta

function sacarConta(): void {
    console.log("Digite o número da Conta: ");
    const numero = Input.questionInt("");

    const conta = contas.buscarNoArray(numero);

    if (conta !== null) {
        console.log("Digite o valor do saque (R$): ");
        const valorSaque = Input.questionFloat("");
        contas.sacar(numero, valorSaque);
    } else {
        console.log(colors.fg.red, `A conta número ${numero} não foi encontrada!`, colors.reset);
    }
}

// Opção 7: Depositar em uma Conta
function depositarConta(): void {
    console.log("Digite o número da Conta: ");
    const numero = Input.questionInt("");

    const conta = contas.buscarNoArray(numero);

    if (conta !== null) {
        console.log("Digite o valor do depósito (R$): ");
        const valorDeposito = Input.questionFloat("");

        contas.depositar(numero, valorDeposito);
    } else {
        console.log(colors.fg.red, `A conta número ${numero} não foi encontrada!`, colors.reset);
    }
}
// Opção 8: Transferir valores entre Contas

function transferirEntreContas(): void {
    console.log("Digite o número da Conta de origem: ");
    const numeroOrigem = Input.questionInt("");

    console.log("Digite o número da Conta de Destino: ");
    const numeroDestino = Input.questionInt("");

    const contaOrigem = contas.buscarNoArray(numeroOrigem);
    const contaDestino = contas.buscarNoArray(numeroDestino);

    if (contaOrigem === null) {
        console.log(colors.fg.red, `A conta de origem ${numeroOrigem} não foi encontrada!`, colors.reset);

    } else if (contaDestino === null) {
        console.log(colors.fg.red, `A conta de destino ${numeroDestino} não foi encontrada!`, colors.reset);
        
    } else {
        console.log("Digite o valor da transferência (R$): ");
        const valorTransferencia = Input.questionFloat("");
        contas.transferir(numeroOrigem, numeroDestino, valorTransferencia);
    }
}

// Opção 9: Procurar Conta por Nome do Titular

function procurarPorTitular(): void {

    //Solicita o nome do titular
    console.log("Digite o nome do Titular da Conta");
    const titular = Input.question("");

    // Localiza a conta a partir do nome do titular
    contas.procurarPorTitular(titular);
}

// Função com os dados da pessoa desenvolvedora
export function sobreProjeto(): void {
    console.log("\n**************************************************");
    console.log(colors.fg.blue, "Projeto desenvolvido por Jeaninny Teixeira");
    console.log(" jeaninny.teixeira@gmail.com");
    console.log(" github.com/Jeaninny", colors.reset, "");
    console.log("**************************************************");
}

function keyPress(): void {
    console.log(colors.fg.yellow, "Pressione enter para continuar...", colors.reset);
    Input.prompt();
}

// Contas para testes
function criarContasTeste(): void {

    // Instâncias da Classe ContaCorrente
    contas.cadastrar(new ContaCorrente(contas.gerarNumero(), 1234, 'Amanda Magro', 1, 1000000.00, 100000.00));
    contas.cadastrar(new ContaCorrente(contas.gerarNumero(), 4578, 'João da Silva', 1, 1000.00, 100.00));

    // Instâncias da Classe ContaPoupança
    contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), 5789, "Geana Almeida", 2, 10000, 10));
    contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), 5698, "Jean Lima", 2, 15000, 15));

}

main();