import ReactDOM from 'react-dom'
import ListarMoedas from './ListarMoedas'

describe("Teste de componetes de listagem de moedas", () => {
    it("Deve renderizar o componente sem erros!", () => {

        const div = document.createElement('div')

        ReactDOM.render(<ListarMoedas/>, div)
        ReactDOM.unmountComponentAtNode(div)

    })
})