import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';

function ConcluirTarefa(props) {
  const [exibirMobal, setExibirModal] = useState(false);

  function modal(event) {
    event.preventDefault();
    setExibirModal(true);
  }

  function btnConcluirTarefa(event) {
    event.preventDefault();
    const tarefasDB = localStorage['tarefas'];
    let tarefas = tarefasDB ? JSON.parse(tarefasDB) : [];

    tarefas = tarefas.map((tarefa) => {
      if (tarefa.id === props.tarefa.id) {
        tarefa.concluida = true;
      }

      return tarefa;
    });

    localStorage['tarefas'] = JSON.stringify(tarefas);
    setExibirModal(false);
    props.onConcluirTarefa(tarefas);
  }

  return (
    <span data-testid="span-button" className={props.checked} style={{ marginRight: '5px' }}>
      <Button className="btn-sm" onClick={modal} data-testid="btn-abrir-modal">
        <FontAwesomeIcon icon={faClipboardCheck} />
      </Button>

      <Modal data-testid="modal" show={exibirMobal} onHide={() => setExibirModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Concluir tarefa</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Marcar a tarefa <strong>{props.tarefa.nome}</strong> como concluida?
        </Modal.Body>

        <Modal.Footer>
          <Button data-testid="btn-concluir" variant="primary" onClick={btnConcluirTarefa}>
            Sim
          </Button>

          <Button
            data-testid="btn-fechar-modal"
            variant="light"
            onClick={() => setExibirModal(false)}
          >
            Não
          </Button>
        </Modal.Footer>
      </Modal>
    </span>
  );
}

ConcluirTarefa.propTypes = {
  tarefa: PropTypes.object.isRequired,
  onConcluirTarefa: PropTypes.func.isRequired,
};

export default ConcluirTarefa;
