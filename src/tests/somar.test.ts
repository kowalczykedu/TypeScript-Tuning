import { somar } from '../model/somaTest';
import { expect, test, describe } from '@jest/globals';

describe('Função somar', () => {
  test.each([
    { a: 2, b: 3, esperado: 5 },
    { a: 10, b: 5, esperado: 15 },
    { a: -2, b: -3, esperado: -5 },
    { a: -2, b: 5, esperado: 3 },
    { a: 0, b: 0, esperado: 0 },
  ])(
    'somar($a, $b) deve retornar $esperado',
    ({ a, b, esperado }) => {
      expect(somar(a, b)).toBe(esperado);
    },
  );
});

describe('Função somar2', () => {
  test.each([
    { a: 4, b: 3, esperado: 7 },
    { a: 10, b: 20, esperado: 32 },
    { a: -10, b: -3, esperado: -13 },
    { a: -2, b: 9, esperado: 7 },
    { a: 0, b: 0, esperado: 0 },
  ])(
    'somar($a, $b) deve retornar $esperado',
    ({ a, b, esperado }) => {
      expect(somar(a, b)).toBe(esperado);
    },
  );
});