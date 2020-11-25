//import styled from 'styled-components'
import { A } from "hookrouter";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ItemLista from "./Itens-listar-tarefas";

function ListarTarefa() {
  const [tarefas, setTarefas] = useState([]);
  const [carregarTarefas, setCarregarTarefas] = useState(true);

  useEffect(() => {
    function obterTarefas() {
      const tarefasDB = localStorage["tarefas"];
      let ListarTarefas = tarefasDB ? JSON.parse(tarefasDB) : [];
      setTarefas(ListarTarefas);
    }
    if (carregarTarefas) {
      obterTarefas();
      setCarregarTarefas(false);
    }
  }, [carregarTarefas]);

  return (
    <div className="text-center">
      <h3>Tarefas a fazers</h3>
      <Table striped bordered hover responsive data-testid="tabela">
        <thead>
          <tr>
            <th width="75%">Tarefa</th>
            <th>
              <A
                href="/cadastrar"
                className="btn btn-success btn-sm"
                data-testid="btn-nova-tarefa"
              >
                <FontAwesomeIcon icon={faPlus} /> Nova tarefa
              </A>
            </th>
          </tr>
        </thead>

        <tbody>
          <ItemLista tarefas={tarefas} recarregarTarefas={setCarregarTarefas} />
        </tbody>
      </Table>
    </div>
  );
}

export default ListarTarefa;
