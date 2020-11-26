//import styled from 'styled-components'
import { A } from 'hookrouter';
import { useEffect, useState } from 'react';
import { Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ItemLista from './Itens-listar-tarefas';
import Pagination from './Paginacao';

function ListarTarefa() {
  const ITENS_POR_PAGINA = 5;

  const [tarefas, setTarefas] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [ordenarAcs, setordenarAcs] = useState(true);
  const [ordenarDesc, setordenarDesc] = useState(false);
  const [filtroTarefa, setFiltroTarefa] = useState('');

  useEffect(() => {
    function obterTarefas() {
      const tarefasDB = localStorage['tarefas'];
      let ListarTarefas = tarefasDB ? JSON.parse(tarefasDB) : [];
      setTarefas(ListarTarefas);
    }

    obterTarefas();
  }, []);

  const onDeleteTarefas = (tarefas) => {
    setTarefas(tarefas);
  };

  const onConcluirTarefa = (tarefas) => {
    setTarefas(tarefas);
  };

  const totalItens = tarefas.length;
  const tarefasPaginada = [...tarefas].splice(
    (paginaAtual - 1) * ITENS_POR_PAGINA,
    ITENS_POR_PAGINA
  );

  function onMudarPagina(pagina) {
    setPaginaAtual(pagina);
  }

  function ordenarTarefas(event) {
    event.preventDefault();

    if (ordenarAcs) {
      setordenarDesc(true);
      setordenarAcs(false);
    } else if (ordenarDesc) {
      setordenarDesc(false);
    } else {
      setordenarDesc(false);
      setordenarAcs(true);
    }

    let ListarTarefas = tarefas;

    if (ordenarAcs) {
      ListarTarefas.sort((t1, t2) => (t1.nome.toLowerCase() > t2.nome.toLowerCase() ? 1 : -1));
      setTarefas(ListarTarefas);
    } else if (ordenarDesc) {
      ListarTarefas.sort((t1, t2) => (t1.nome.toLowerCase() < t2.nome.toLowerCase() ? 1 : -1));
      setTarefas(ListarTarefas);
    } else {
      ListarTarefas.sort((t1, t2) => (t1.id > t2.id ? 1 : -1));
    }
  }

  function filtrar(event) {
    setFiltroTarefa(event.target.value);

    if (event.target.value !== '') {
      let filtroNome = JSON.parse(localStorage['tarefas']).filter(
        (tarefa) => tarefa.nome.toLowerCase().indexOf(event.target.value.toLowerCase()) === 0
      );
      setTarefas(filtroNome);
    } else {
      setTarefas(JSON.parse(localStorage['tarefas']));
    }
  }

  return (
    <div className="text-center">
      <Table striped bordered hover responsive data-testid="tabela">
        <thead>
          <tr>
            <th width="75%">
              <a href="/gerenciador" onClick={ordenarTarefas} style={{ textDecoration: 'none' }}>
                Tarefas
              </a>
            </th>

            <th>
              <A
                href="/gerenciador/cadastrar"
                className="btn btn-success btn-sm"
                data-testid="btn-nova-tarefa"
              >
                <FontAwesomeIcon icon={faPlus} /> Nova tarefa
              </A>
            </th>
          </tr>
          <tr>
            <th colSpan="2">
              <Form.Control
                style={{ width: '100%', margin: '0' }}
                placeholder="Pesquisar"
                type="text"
                value={filtroTarefa}
                onChange={filtrar}
              />
            </th>
          </tr>
        </thead>

        <tbody>
          <ItemLista
            tarefas={tarefasPaginada}
            onConcluirTarefa={onConcluirTarefa}
            onDeleteTarefas={onDeleteTarefas}
          />
        </tbody>
      </Table>
      <div style={{ display: 'inline-block' }}>
        <Pagination
          totalDeItems={totalItens}
          itemsPorPagina={ITENS_POR_PAGINA}
          paginaAtual={paginaAtual}
          mudarPagina={onMudarPagina}
        />
      </div>
    </div>
  );
}

export default ListarTarefa;
