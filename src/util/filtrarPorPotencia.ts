import type Motor from "../model/Motor";
export function filtrarPorPotencia(motores: Motor[], minimo?: number, maximo?: number): Motor[] {
    const resultado: Motor[] = [];
    for (const motor of motores) {
        const potencia = Math.round(motor.getPotenciaAtual());
        
        if ((minimo === undefined || potencia >= minimo) && (maximo === undefined || potencia <= maximo)) {
            resultado.push(motor);
        }
    }
    return resultado;
}