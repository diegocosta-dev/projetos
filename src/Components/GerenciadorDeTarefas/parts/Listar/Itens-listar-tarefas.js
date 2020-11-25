import propTypes from "prop-types";
import { A } from "hookrouter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import ConcluirTarefas from "./ConcluirTarefa";

function ItemLista(props) {
  return props.tarefas.map((tarefa) => (
    <tr key={tarefa.id} data-testid="tarefa">
      <td width="75%">
        {tarefa.concluida ? (
          <li
            data-testid="nome-tarefa"
            style={{ textDecoration: "line-through" }}
          >
            {tarefa.nome}
          </li>
        ) : (
          <li>{tarefa.nome}</li>
        )}
      </td>

      <td className="text-right">
        <ConcluirTarefas
          tarefa={tarefa}
          recarregarTarefas={props.recarregarTarefas}
          checked={tarefa.concluida ? "hidden" : null}
        />
        <A
          href={"/atualizar/" + tarefa.id}
          className={tarefa.concluida ? "hidden" : "btn btn-warning btn-sm"}
        >
          <FontAwesomeIcon icon={faEdit} />
        </A>
      </td>
    </tr>
  ));
}

ItemLista.propTypes = {
  tarefas: propTypes.array.isRequired,
  recarregarTarefas: propTypes.func.isRequired,
};

export default ItemLista;
