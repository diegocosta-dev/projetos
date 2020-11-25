///import styled from 'styled-components'
import { useState } from 'react';
import { Button, Form, Jumbotron, Modal } from 'react-bootstrap';
import { navigate, A } from 'hookrouter';
import Tarefa from '../../../../Models/Tarefa.model';

/* 
const Title = styled.h3`
    text-align: ${props => props.align};
    text-transform: ${props => props.upper == true? 'uppercase' : 'none'};
    color: ${props => props.color}
`

const Box = styled.div`
    background-color: #cfd2d6;
    padding: 50px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Form = styled.form`
    margin: 10px 50px;

    @media screen and (max-width: 600px) {
        flex-direction: column;
    }

     
`

const Label = styled.label`
    margin: 10px;
    font-size: 1.2rem;
`

const Input = styled.input.attrs(props => ({type: "text"}))`
    width: 100%;
    height: 30px;
    border-radius: 4px;
    background-color: white;
    border: none;
    

    &:hover {
        border: none;
        background-color: white;
    }

`

const Button = styled.button.attrs(props => ({type: "submit"}))`
    width: ${props => props.width || '60px'} ;
    height: ${props => props.height || '30px'};
    border-radius: 4px;
    background-color: ${props => props.colorBg || "#81B622"};
    color: ${props => props.color || "white"} ;
    border: none;
    

    &:hover {
        border: none;
        background-color:  ${props => props.colorBgHover || "#59981A"};
        color: ${props => props.colorHover || "white"} ;
    }

    @media screen and (max-width: 600px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        width: 100%;
    }
`

*/

function CadastrarTarefa() {
  const [tarefa, setTarefa] = useState('');
  const [fromValidado, setFromValidado] = useState(false);
  const [exibirModal, setexibirModal] = useState(false);

  function closeModal() {
    navigate('/');
  }

  function cadastrar(event) {
    event.preventDefault();
    setFromValidado(true);

    if (event.currentTarget.checkValidity() === true) {
      //obtem as tarefas
      const tarefasDB = localStorage['tarefas'];
      const tarefas = tarefasDB ? JSON.parse(tarefasDB) : [];

      //persiste a tarefa
      tarefas.push(new Tarefa(new Date().getTime(), tarefa, false));
      localStorage['tarefas'] = JSON.stringify(tarefas);
      setexibirModal(true);
    }
  }

  return (
    <div>
      <Jumbotron>
        <h3 className="text-center" style={{ textTransform: 'uppercase' }}>
          Cadastrar
        </h3>

        <Form validated={fromValidado} onSubmit={cadastrar} noValidate>
          <Form.Group>
            <Form.Label>Tarefa</Form.Label>

            <Form.Control
              type="text"
              placeholder="Digite a tarefa"
              minLength="5"
              maxLength="100"
              value={tarefa}
              required
              onChange={(event) => setTarefa(event.target.value)}
              data-testid="txt-tarefa"
            />

            <Form.Control.Feedback type="invalid">
              A tarefa deve conter ao menos 5 caracteres.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="text-center">
            <Button
              style={{ width: '100px' }}
              variant="success"
              type="submit"
              data-testid="btn-cadastrar"
            >
              Cadastrar
            </Button>

            <A href="/" className="btn btn-light" style={{ margin: '10px' }}>
              Voltar
            </A>
          </Form.Group>
        </Form>

        <Modal show={exibirModal} onHide={closeModal} data-testid="modal">
          <Modal.Header closeButton>
            <Modal.Title>Sucesso</Modal.Title>
          </Modal.Header>

          <Modal.Body>Tarefa adicionada com sucesso</Modal.Body>

          <Modal.Footer>
            <Button onClick={closeModal} variant="success" style={{ width: '100px' }}>
              Continuar
            </Button>
          </Modal.Footer>
        </Modal>
      </Jumbotron>
      {/*
            <Box>
                <Title color="#67595E" upper={true} align='center'>Cadastrar</Title>
                
                <Form action="/"> 
                    <Label for="inputForm">Tarefa</Label>
                    <Input value={checkvalue}
                           onChange={event => setChekvalue(event.target.value)}
                           id="inputForm" placeholder="Digite a tarefa"></Input>
                    <Button width="100px">Salvar</Button>

                    <Button colorBg="white"
                            color='black'
                            colorBgHover='#E3E8E9'
                            colorHover="black"
                            width="100px">
                        Voltar
                    </Button>
                </Form>
            </Box>
            */}
    </div>
  );
}

export default CadastrarTarefa;
