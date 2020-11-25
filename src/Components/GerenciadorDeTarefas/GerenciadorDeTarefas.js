//import styled from 'styled-components'
import { useRoutes } from 'hookrouter';
import AtualizarTarefa from './parts/Atualizar/AtualizarTarefa';
import CadastrarTarefa from './parts/Cadastrar/CadastrarTarefa';
import ListarTarefas from './parts/Listar/ListarTarefas';

// Routes
const routes = {
  '/': () => <ListarTarefas />,
  '/cadastrar': () => <CadastrarTarefa />,
  '/atualizar/:id': ({ id }) => <AtualizarTarefa id={id} />,
};

function Gerenciador() {
  return useRoutes(routes);
}

export default Gerenciador;
