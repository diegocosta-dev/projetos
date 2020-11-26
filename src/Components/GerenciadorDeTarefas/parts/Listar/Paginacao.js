import Pagination from 'react-bootstrap/Pagination';
import PropTypes from 'prop-types';

function Paginacao(props) {
  const gerarPrimeiroItem = () => {
    return (
      <Pagination.First
        key="pageFist"
        onClick={() => props.mudarPagina(1)}
        disabled={props.paginaAtual === 1}
      />
    );
  };

  const gerarItemAnterior = () => {
    return (
      <Pagination.Prev
        key="PagPrev"
        onClick={() => props.mudarPagina(props.paginaAtual - 1)}
        disabled={props.paginaAtual === 1}
      />
    );
  };

  const gerarItemNumerico = (pagina) => {
    return (
      <Pagination.Item
        key={pagina}
        active={pagina === props.paginaAtual}
        onClick={() => props.mudarPagina(pagina)}
      >
        {pagina}
      </Pagination.Item>
    );
  };

  const gerarProximoItem = (numPaginas) => {
    return (
      <Pagination.Next
        key="PagNexy"
        onClick={() => props.mudarPagina(props.paginaAtual + 1)}
        disabled={props.paginaAtual === numPaginas}
      />
    );
  };

  const gerarUltimoItem = (numPaginas) => {
    return (
      <Pagination.Last
        key="pagLast"
        onClick={() => props.mudarPagina(numPaginas)}
        disabled={props.paginaAtual === numPaginas}
      />
    );
  };

  const obterPaginalcao = () => {
    const numPaginas = Math.ceil(props.totalDeItems / props.itemsPorPagina);
    let items = [];
    items.push(gerarPrimeiroItem());
    items.push(gerarItemAnterior());

    for (let pagina = 1; pagina <= numPaginas; pagina++) {
      if (pagina < props.paginaAtual + 3 && pagina > props.paginaAtual - 3) {
        items.push(gerarItemNumerico(pagina));
      }
    }
    items.push(gerarProximoItem(numPaginas));
    items.push(gerarUltimoItem(numPaginas));

    return items;
  };

  return <Pagination style={{ padding: '50px auto' }}>{obterPaginalcao()}</Pagination>;
}

Paginacao.prototype = {
  totalDeItems: PropTypes.number.isRequired,
  itemsPorPagina: PropTypes.number.isRequired,
  paginaAtual: PropTypes.number.isRequired,
  mudarPagina: PropTypes.func.isRequired,
};

export default Paginacao;
