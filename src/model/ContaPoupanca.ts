import { colors } from "../util/Colors";
import { Conta } from "./Conta";
import { formatarMoeda } from "../util/Currency";

export class ContaPoupanca extends Conta {

    // Atributos específicos de Conta Poupança
    private _aniversario: number;

    // Construtor com a chamada para a Super Classe
    constructor(numero: number, agencia: number, tipo: number, titular: string, 
        saldo: number, aniversario: number) {
        super(numero, agencia, tipo, titular, saldo);
        this._aniversario = aniversario;
    }

    // Métodos GET e SET específicos da Classe Conta Poupanca
    public get aniversario() {
        return this._aniversario;
    }

    public set aniversario(aniversario: number) {
        this._aniversario = aniversario;
    }

    // Método visualizar sobrescrito (Polimorfismo)
    public visualizar(): void {
        super.visualizar();
        console.log("Dia do aniversário: " + this._aniversario);
    }

}