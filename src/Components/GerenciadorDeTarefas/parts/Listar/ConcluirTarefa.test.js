import ReactDOM from "react-dom";
import ConcluirTarefa from "./ConcluirTarefa";
import Tarefa from "../../../../Models/Tarefa.model";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

const nomeTarefa = "nova tarefa";
const tarefa = new Tarefa(1, nomeTarefa, false);

describe("Teste do componente de conclusão de tarefas", () => {
  it("Deve Rendedizer o componente corretamente", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <ConcluirTarefa tarefa={tarefa} recarregarTarefas={() => false} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("Deve exibir a modal corretamente", () => {
    const { getByTestId } = render(
      <ConcluirTarefa tarefa={tarefa} recarregarTarefas={() => false} />
    );
    fireEvent.click(getByTestId("btn-abrir-modal"));
    expect(getByTestId("modal")).toHaveTextContent(nomeTarefa);
  });

  it("Deve concluir uma tarefa", () => {
    localStorage["tarefas"] = JSON.stringify([tarefa]);
    const { getByTestId } = render(
      <ConcluirTarefa tarefa={tarefa} recarregarTarefas={() => false} />
    );
    fireEvent.click(getByTestId("btn-abrir-modal"));
    fireEvent.click(getByTestId("btn-concluir"));
    const tarefaDB = JSON.parse(localStorage["tarefas"]);
    expect(tarefaDB[0].concluida).toBeTruthy();
  });
});
