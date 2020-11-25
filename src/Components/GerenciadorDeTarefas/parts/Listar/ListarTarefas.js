//import styled from 'styled-components'
import { A } from 'hookrouter';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ItemLista from './Itens-listar-tarefas';
import Pagination from './Paginacao';

function ListarTarefa() {
  const ITENS_POR_PAGINA = 1;

  const [tarefas, setTarefas] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);

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

  return (
    <div className="text-center">
      <h3>Tarefas a fazers</h3>
      <Table striped bordered hover responsive data-testid="tabela">
        <thead>
          <tr>
            <th width="75%">Tarefa</th>
            <th>
              <A href="/cadastrar" className="btn btn-success btn-sm" data-testid="btn-nova-tarefa">
                <FontAwesomeIcon icon={faPlus} /> Nova tarefa
              </A>
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
      <Pagination
        totalDeItems={totalItens}
        itemsPorPagina={ITENS_POR_PAGINA}
        paginaAtual={paginaAtual}
        mudarPagina={onMudarPagina}
      />
    </div>
  );
}

export default ListarTarefa;
