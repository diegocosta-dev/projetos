import './Calculadora.css';
import { useState } from 'react';
import { Jumbotron, Container, Row, Col, Button, Form } from 'react-bootstrap';
import CalculadoraService from './Calculadora.service';
import Titulo from './componentes/Titulo.jsx';

function App() {
  const [calcular, concatenarNumero, SOMA, SUB, DIV, MULT] = CalculadoraService();

  const [display, setDisplay] = useState('0');
  const [num1, setNum1] = useState('0');
  const [num2, setNum2] = useState(null);
  const [operacao, setOperacao] = useState(null);

  function adicionarNumeros(numero) {
    let resultado;

    if (operacao === null) {
      resultado = concatenarNumero(num1, numero);
      setNum1(resultado);
    } else {
      resultado = concatenarNumero(num2, numero);
      setNum2(resultado);
    }

    setDisplay(resultado);
  }

  function definirOperacao(op) {
    if (operacao === null) {
      setOperacao(op);
      return;
    }

    if (num2 !== null) {
      const resultado = calcular(parseFloat(num1), parseFloat(num2), operacao);
      setOperacao(op);
      setNum1(resultado.toString());
      setNum2(null);
      setDisplay(resultado.toString());
    }
  }

  function acaoCalcular() {
    if (num2 === null) {
      return;
    }
    const resultado = calcular(parseFloat(num1), parseFloat(num2), operacao);
    setDisplay(resultado);
  }

  function acaoLimpar() {
    setDisplay('0');
    setNum1('0');
    setNum2(null);
    setOperacao(null);
  }

  return (
    <div className="App">
      <Jumbotron
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'tranparent !important',
          backgroundColor: '#C71585',
          padding: '5px',
          margin: '0 auto',
          width: '100%',
          height: '100vh',
        }}
      >
        <Titulo titulo="Calculadora" />
        <Container
          style={{
            width: '400px',
            margin: '0 auto',
            padding: '10px',
            borderRadius: '10px',
            backgroundColor: '#FFB6C1',
            boxShadow: '-2px -2px 20px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Row>
            <Col x="3">
              <Button variant="danger" onClick={acaoLimpar}>
                C
              </Button>
            </Col>
            <Col xs="9">
              <Form.Control
                type="text"
                name="txtNumeros"
                className="text-right"
                readOnly="readonly"
                value={display}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Button variant="light" onClick={() => adicionarNumeros('7')}>
                7
              </Button>
            </Col>
            <Col>
              <Button variant="light" onClick={() => adicionarNumeros('8')}>
                8
              </Button>
            </Col>
            <Col>
              <Button variant="light" onClick={() => adicionarNumeros('9')}>
                9
              </Button>
            </Col>
            <Col>
              <Button
                variant="warning"
                style={{ color: 'white', fontWeight: 'bold' }}
                onClick={() => definirOperacao(DIV)}
              >
                /
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button variant="light" onClick={() => adicionarNumeros('4')}>
                4
              </Button>
            </Col>
            <Col>
              <Button variant="light" onClick={() => adicionarNumeros('5')}>
                5
              </Button>
            </Col>
            <Col>
              <Button variant="light" onClick={() => adicionarNumeros('6')}>
                6
              </Button>
            </Col>
            <Col>
              <Button
                variant="warning"
                style={{ color: 'white', fontWeight: 'bold' }}
                onClick={() => definirOperacao(MULT)}
              >
                *
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button variant="light" onClick={() => adicionarNumeros('1')}>
                1
              </Button>
            </Col>
            <Col>
              <Button variant="light" onClick={() => adicionarNumeros('2')}>
                2
              </Button>
            </Col>
            <Col>
              <Button variant="light" onClick={() => adicionarNumeros('3')}>
                3
              </Button>
            </Col>
            <Col>
              <Button
                variant="warning"
                style={{ color: 'white', fontWeight: 'bold' }}
                onClick={() => definirOperacao(SUB)}
              >
                -
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button variant="light" onClick={() => adicionarNumeros('0')}>
                0
              </Button>
            </Col>
            <Col>
              <Button variant="light" onClick={() => adicionarNumeros('.')}>
                .
              </Button>
            </Col>
            <Col>
              <Button variant="success" onClick={acaoCalcular}>
                =
              </Button>
            </Col>
            <Col>
              <Button
                variant="warning"
                style={{ color: 'white', fontWeight: 'bold' }}
                onClick={() => definirOperacao(SOMA)}
              >
                +
              </Button>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    </div>
  );
}

export default App;
