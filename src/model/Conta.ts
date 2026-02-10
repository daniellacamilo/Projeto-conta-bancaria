import { colors } from "../util/Colors";
import { formatarMoeda } from "../util/Currency";
export abstract class Conta {

     // Atributos da Classe
    private _numero: number;
    private _agencia: number;
    private _tipo: number;
    private _titular: string;
    private _saldo: number;

    // Método Construtor
    constructor(numero: number, agencia: number, tipo: number, titular: string, saldo: number) {
        this._numero = numero;
        this._agencia = agencia;
        this._tipo = tipo;
        this._titular = titular;
        this._saldo = saldo;
    }

     // Métodos getters e setters
    public get numero(): number {
        return this._numero;
    }

    public get agencia(): number {
        return this._agencia;
    }

    public get titular(): string {
        return this._titular;
    }

    public get tipo(): number {
        return this._tipo;
    }

    public get saldo(): number {
        return this._saldo;
    }

    public set numero(value: number) {
        this._numero = value;
    }

    public set agencia(value: number) {
        this._agencia = value;
    }

    public set titular(value: string) {
        this._titular = value;
    }

    public set tipo(value: number) {
        this._tipo = value;
    }

    public set saldo(value: number) {
        this._saldo = value;
    }

    //Métodos Auxiliares

      public sacar(valor: number): boolean {

        if(valor <= 0){
            console.log(colors.fg.red, "\nO valor deve ser positivo", colors.reset);
            return false;
        }

        if(valor > this._saldo){
            console.log(colors.fg.red, "\nSaldo Insuficiente!", colors.reset);
            return false;
        }

        this._saldo -= valor;
        return true;
    }

    public depositar(valor: number): void {

        if(valor <= 0)
            console.log(colors.fg.red, "O valor deve ser positivo", colors.reset);
        else
            this._saldo += valor;
    }

    public visualizar(): void {

        let tipo: string;

        switch(this._tipo){
            case 1:
                tipo = "Conta Corrente";
            break;
            case 2:
                tipo = "Conta Poupança";
            break;
            default:
                tipo = "Tipo Inválido";
        }

        console.log("\n*****************************************************");
        console.log("Dados da Conta:");
        console.log("*****************************************************");
        console.log("Numero da Conta: " + this._numero);
        console.log("Agência: " + this._agencia);
        console.log("Tipo da Conta: " + tipo);
        console.log("Titular: " + this._titular);
        console.log("Saldo: " + this._saldo.toFixed(2));

    }

}