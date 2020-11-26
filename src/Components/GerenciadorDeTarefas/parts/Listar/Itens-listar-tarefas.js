import propTypes from 'prop-types';
import { A } from 'hookrouter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import ConcluirTarefas from './ConcluirTarefa';
import ExcluirTarefa from './ExluirTarefa';

function ItemLista(props) {
  return props.tarefas.map((tarefa) => (
    <tr key={tarefa.id} data-testid="tarefa">
      <td width="75%">
        {tarefa.concluida ? (
          <li data-testid="nome-tarefa" style={{ textDecoration: 'line-through' }}>
            {tarefa.nome}
          </li>
        ) : (
          <li>{tarefa.nome}</li>
        )}
      </td>

      <td>
        <div style={{ display: 'flex' }}>
          <ConcluirTarefas
            tarefa={tarefa}
            onConcluirTarefa={props.onConcluirTarefa}
            checked={tarefa.concluida ? 'hidden' : null}
          />
          <A
            href={'gerenciador/atualizar/' + tarefa.id}
            className={tarefa.concluida ? 'hidden' : 'btn btn-warning btn-sm'}
            style={{ marginRight: '5px' }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </A>
          <ExcluirTarefa onDeleteTarefas={props.onDeleteTarefas} tarefa={tarefa} />
        </div>
      </td>
    </tr>
  ));
}

ItemLista.propTypes = {
  tarefas: propTypes.array.isRequired,
  onConcluirTarefa: propTypes.func.isRequired,
  onDeleteTarefas: propTypes.func.isRequired,
};

export default ItemLista;
