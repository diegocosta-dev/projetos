import ReactDOM from 'react-dom';
import CadastrarTarefas from './CadastrarTarefa';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Teste do componente de Cadastra as tarefas', () => {
  it('Deve rendedizer o componente corretamente!', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CadastrarTarefas />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Deve cadastrar uma nova tarefa', () => {
    const { getByTestId } = render(<CadastrarTarefas />);
    fireEvent.change(getByTestId('txt-tarefa'), {
      target: { value: 'Testar Componente' },
    });
    fireEvent.click(getByTestId('btn-cadastrar'));

    expect(getByTestId('modal')).toHaveTextContent('Sucesso');
    expect(getByTestId('modal')).toHaveTextContent('Tarefa adicionada com sucesso');
  });
});
