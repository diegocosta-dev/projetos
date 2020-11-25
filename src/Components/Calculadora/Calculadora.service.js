function CalculadoraService() {
    const SOMA = '+'
    const SUB = '-'
    const DIV = '/'
    const MULT = '*'


    function calcular(valor1, valor2, op) {
        let resultado
        
        switch(op) {
            case SOMA:
                resultado = valor1 + valor2
                break   
            case SUB:
                resultado = valor1 - valor2
                break
            case DIV:
                resultado = valor1 / valor2
                break
            case MULT: 
                resultado = valor1 * valor2
                break
            default:
                resultado = 0
        }
        
        return resultado
    }

    function concatenarNumero(numAtual, numConcat) {
        // caso contenha apenas '0' ou 'null' reinicia o valor
        if (numAtual === '0' || numAtual === null) {
            numAtual = ''
        }
        // primeiro digito for '.' concatena '0' antes do ponto
        if (numConcat === '.' && numAtual === '') {
            return '0.'
        }
        // caso '.' digitado e ja contenha um ponto, apenas retorne
        if (numConcat === '.' && numAtual.indexOf('.') > -1) {
            return numAtual
        }
        
        return numAtual + numConcat
    }

    return [
        calcular,
        concatenarNumero,
        SOMA,
        SUB, 
        DIV,
        MULT
    ]

}

export default CalculadoraService;