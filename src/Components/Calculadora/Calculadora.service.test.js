import React from 'react'
import ReactDOM from 'react-dom'
import ClaculadoraService from './Calculadora.service'

describe('Testa do App.service', () => {
    const [calcular, concatenarNumero, SOMA, SUB, DIV, MULT] = ClaculadoraService()

    it('Deve garantir que 1 + 4 = 5', () => {
        let soma = calcular(1, 4, SOMA)
        expect(soma).toEqual(5)
    })

    it("Deve grantir que 10 - 5 = 5", () => {
        let sub = calcular(10, 5, SUB)
        expect(sub).toEqual(5)
    })

    it("Deve garantir que 7 / 2 = 3.5", () => {
        let div = calcular(7, 2, DIV)
        expect(div).toEqual(3.5)
    })

    it('Deve garantir que 8 * 7 = 56', () => {
        let mult = calcular(8, 7, MULT)
        expect(mult).toEqual(56)
    })

    it('Deve retornar 0 para operação invalida!', () => {
        let invalid = calcular(1, 0, '%')
        expect(invalid).toEqual(0)
    })
})