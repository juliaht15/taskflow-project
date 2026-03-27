// src/math-utils.ts

/**
 * Calcula la media de un array de números.
 * Retorna null si el array está vacío (Manejo de casos límite).
 */
export function calcularMedia(datos: number[]): number | null {
    if (datos.length === 0) return null;
    const suma = datos.reduce((acc, val) => acc + val, 0);
    return suma / datos.length;
}

/**
 * Filtra valores atípicos (outliers) que superen un límite.
 */
export function filtrarAtipicos(datos: number[], limite: number): number[] {
    return datos.filter(valor => valor <= limite);
}

/**
 * Calcula la mediana. 
 * TS nos obligará a tratar el array como numérico.
 */
export function calcularMediana(datos: number[]): number | null {
    if (datos.length === 0) return null;
    const ordenados = [...datos].sort((a, b) => a - b);
    const mitad = Math.floor(ordenados.length / 2);

    if (ordenados.length % 2 !== 0) {
        return ordenados[mitad];
    }
    return (ordenados[mitad - 1] + ordenados[mitad]) / 2;
}