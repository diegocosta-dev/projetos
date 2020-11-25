import './Conversor.css';
import { useState } from 'react'
import { Jumbotron, Button, Col, Spinner, Form, Alert, Modal} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import ListarMoedas from "./parts/ListarMoedas";
import axios from 'axios'

function Conversor() {
  
  const FIXER_URL = 'http://data.fixer.io/api/latest?access_key=3bd29279b8f76f06a06d74de0841b07d'

  const [valor, setValor] = useState(1)
  const [moedaDe, setMoedaDe] = useState('BRL')
  const [moedaPara, setMoedaPara] = useState('USD')
  const [exibirSpiner, setExibirSpiner] = useState(false)
  const [formValidado, setFormValidado] = useState(false)
  const [exibirModal, setExibirModal] = useState(false)
  const [exibirResultado, setExibirResultado] = useState('')
  const [exibirMenssagemDeErro, setExibirMenssagemDeErro] = useState(false)

  function converter(event) {

    event.preventDefault()
    setFormValidado(true)

    if (event.currentTarget.checkValidity() === true) {
      setExibirSpiner(true)
      axios.get(FIXER_URL)
      .then(res => {
        const cotacao = obterCotacao(res.data)
        if (cotacao) {
          setExibirModal(true)
          setExibirResultado(`${valor} ${moedaDe} = ${cotacao} ${moedaPara}`)
          setExibirMenssagemDeErro(false)
        }
        else {
          exibirErro()
        }
      })
      .catch(err => exibirErro())
    }
    
  }

  function obterCotacao(dadosCotacao) {
    if (!dadosCotacao || dadosCotacao.success !== true) {
      return false
    }

    const cotacaoDe = dadosCotacao.rates[moedaDe]
    const cotacaoPara = dadosCotacao.rates[moedaPara]
    const cotacao = (1 / cotacaoDe * cotacaoPara) * valor

    return cotacao.toFixed(2)

  }


  function fechaModal() {
    setValor('1')
    setExibirModal(false)
    setFormValidado(false)
    setExibirSpiner(false)
    setMoedaDe('BRL')
    setMoedaPara('USD')
  }

  function exibirErro() {
    setExibirMenssagemDeErro(true)
    setExibirSpiner(false)
  }

  return (
    <div className="Conversor">

      <Alert className='text-center'
             show={exibirMenssagemDeErro}
             variant="danger"
             style={{margin: '0px'}}>
        Erro ao obter dados, tente novamente!
      </Alert> 
      
      <Jumbotron style={{paddingTop: '50px', paddingBottom: '100px'}}>

        <h1 style={{color: '#A9A9A9', marginBottom: '50px', textAlign: "center"}}>
          Conversor de Moedas
        </h1>

        <h1 style={{color: '#A9A9A9', marginBottom: '50px', textAlign: "center"}}>
          {moedaDe} para {moedaPara}
        </h1>

        <Form onSubmit={converter} noValidate validated={formValidado}>

          <Form.Row>

            <Col sm='3'>
              <Form.Control placeholder="0"
                            value={valor}
                            onChange={event => setValor(event.target.value.replace(/\D/g, ''))}
                            required 
              />
            </Col>

            <Col sm='3'>
              <Form.Control as="select"
                            value={moedaDe}
                            onChange={event => setMoedaDe(event.target.value)}>
                <ListarMoedas></ListarMoedas>
              </Form.Control>
            </Col>

            <Col sm='1' className="text-center" style={{paddingTop: '5px'}}>
              <FontAwesomeIcon icon={faAngleDoubleRight}></FontAwesomeIcon>
            </Col>

            <Col sm='3'>
              <Form.Control as="select"
                            value={moedaPara} onChange={event => setMoedaPara(event.target.value)}>
                <ListarMoedas value={moedaPara}></ListarMoedas>
              </Form.Control>
            </Col>

            <Col sm='2'>
              <Button variant="success" type="submit" onClick={converter}>
                <span className={exibirSpiner ? null : 'hidden'}>
                  <Spinner animation='border' size='sm'></Spinner>
                </span>
                <span className={exibirSpiner ? 'hidden' : null}
                                style={{padding: '5px', display: 'inline'}}>
                  Converter
                </span>
              </Button>
            </Col>

          </Form.Row>

        </Form>

        <Modal show={exibirModal} onHide={fechaModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              Converção
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
              {exibirResultado}
          </Modal.Body>

          <Modal.Footer>

            <Button variant='success' onClick={fechaModal}>
              Nova Converção
            </Button>
              
          </Modal.Footer>

        </Modal>

      </Jumbotron>
      
    </div>
  );
}

export default Conversor;
