import { useState } from 'react';
import { Jumbotron, Form, Modal, Button } from 'react-bootstrap';
import { A, navigate } from 'hookrouter';

function AtualizarTarefa(props) {
  const [tarefa, setTarefa] = useState('');
  const [exibirModal, setExibirModal] = useState(false);
  const [formValidade, setFormValidado] = useState(false);
  const tarefasDB = localStorage['tarefas'];
  const tarefas = tarefasDB ? JSON.parse(tarefasDB) : [];

  function abirModal(event) {
    event.preventDefault();
    setFormValidado(true);

    if (event.currentTarget.checkValidity() === true) {
      setExibirModal(true);
    }
  }

  function atualizarTarefas() {
    if (tarefas) {
      tarefas.map((item) => {
        if (parseInt(item.id) === parseInt(props.id)) {
          item.nome = tarefa;
        }
        return item;
      });
      localStorage['tarefas'] = JSON.stringify(tarefas);
      navigate('/gerenciador');
    }
  }

  function pegarInfor() {
    const infors = tarefas.filter((item) => parseInt(item.id) === parseInt(props.id));
    return infors;
  }

  const informacoes = pegarInfor();

  return (
    <>
      <Jumbotron>
        <h3 className="text-center" style={{ margin: '50px' }}>
          Atualizar Tarefa
        </h3>
        <Form validated={formValidade} onSubmit={abirModal} noValidate>
          <Form.Group>
            <Form.Label>{informacoes[0].nome}</Form.Label>
            <Form.Control
              type="text"
              value={tarefa}
              onChange={(event) => setTarefa(event.target.value)}
              placeholder="Para"
              required
              minLength="5"
              maxLength="100"
            />

            <Form.Control.Feedback type="invalid">
              A tarefa deve ter no minimo 5 carecteres
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="text-center">
            <Button style={{ marginRight: '10px' }} type="submit" variant="success">
              Atualizar
            </Button>
            <A className="btn btn-light" href="/gerenciador">
              Voltar
            </A>
          </Form.Group>
        </Form>
        <Modal show={exibirModal} onHide={() => setExibirModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Atualizar Tarefa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Deseja realmente atualizar a segunte tarefa? <strong>{informacoes[0].nome}</strong> para{' '}
            <strong>{tarefa}</strong>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={atualizarTarefas} variant="success">
              Sim
            </Button>
            <Button onClick={() => setExibirModal(false)} variant="light">
              Não
            </Button>
          </Modal.Footer>
        </Modal>
      </Jumbotron>
    </>
  );
}

export default AtualizarTarefa;
