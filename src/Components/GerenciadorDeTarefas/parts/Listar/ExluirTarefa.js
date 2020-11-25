import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function ExcluirTarefa(props) {
  const [exibirModal, setExibirModal] = useState(false);

  function abrirModal(event) {
    event.preventDefault();
    setExibirModal(true);
  }

  function deletarTarefa(event) {
    event.preventDefault();
    const tarefasDB = localStorage['tarefas'];
    let tarefas = tarefasDB ? JSON.parse(tarefasDB) : [];

    tarefas = tarefas.filter((tarefa) => {
      return tarefa.id !== props.tarefa.id;
    });

    localStorage['tarefas'] = JSON.stringify(tarefas);
    setExibirModal(false);
    props.onDeleteTarefas(tarefas);
  }

  return (
    <span>
      <Button
        onClick={abrirModal}
        variant="danger"
        className="btn-sm"
        style={{ marginLeft: '5px' }}
      >
        <FontAwesomeIcon icon={faTrash} />
      </Button>

      <Modal show={exibirModal} onHide={() => setExibirModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Remover Tarefa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Deseja remover a seginte tarefa?{' '}
          <div>
            <strong>{props.tarefa.nome}</strong>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={deletarTarefa}>
            Sim
          </Button>
          <Button variant="light" onClick={() => setExibirModal(false)}>
            Não
          </Button>
        </Modal.Footer>
      </Modal>
    </span>
  );
}

ExcluirTarefa.propTypes = {
  tarefa: PropTypes.object.isRequired,
  onDeleteTarefas: PropTypes.func.isRequired,
};

export default ExcluirTarefa;
