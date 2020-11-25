import { render, screen } from '@testing-library/react';
import ReactDOM from 'react-dom'
import Conversor from './Conversor';

describe("Teste Do componente Conversor", () => {
  it("Deve renderizer o componete corretamente", () => {
    const div = document.createElement('div')
    ReactDOM.render(<Conversor/>, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
