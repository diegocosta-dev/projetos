import ReactDOM from "react-dom";
import LitensListarTarefas from "./Itens-listar-tarefas";
import Tarefas from "../../../../Models/Tarefa.model";

import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Tesde do componente de listagem de tarefas", () => {
  const nomeTarefa = "Tarefa";
  const tarefa = new Tarefas(1, nomeTarefa, false);
  const tarefaConcluida = new Tarefas(1, nomeTarefa, true);

  it("Deve renderizer o componente corretamente!", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <LitensListarTarefas tarefas={[]} recarregarTarefas={() => false} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("Deve exibir a tarefa", () => {
    const { getByTestId } = render(
      <table>
        <tbody>
          <LitensListarTarefas
            tarefas={[tarefa]}
            recarregarTarefas={() => false}
          />
        </tbody>
      </table>
    );

    expect(getByTestId("tarefa")).toHaveTextContent(nomeTarefa);
  });

  it("Deve exibir a tarefa", () => {
    const { getByTestId } = render(
      <table>
        <tbody>
          <LitensListarTarefas
            tarefas={[tarefaConcluida]}
            recarregarTarefas={() => false}
          />
        </tbody>
      </table>
    );

    expect(getByTestId("nome-tarefa")).toHaveStyle(
      "text-decoration: line-through"
    );
  });
});
