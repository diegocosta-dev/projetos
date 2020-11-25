import ReactDOM from 'react-dom';
import AtualizarTarefas from './AtualizarTarefa';

describe('Teste do componente de Atualizar as tarefas', () => {
  it('Deve Renderizer o componente corretamente', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AtualizarTarefas id={1} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
