function listarMoedas(props) {
    const Moedas = [
        {"sigla": "EUR", "descricao": "Euro"},
        {"sigla": "BGN", "descricao": "Lev búlgaro"},
        {"sigla": "BRL", "descricao": "Real brasileiro"},
        {"sigla": "AUD", "descricao": "Dólar australiano"},
        {"sigla": "CAD", "descricao": "Dólar canadense"},
        {"sigla": "USD", "descricao": "Dólar americano"}
    ]

    function compare(moeda1, moeda2) {

        if (moeda1.descricao < moeda2.descricao){
            return -1
        }else if (moeda1.descricao > moeda2.descricao) {
            return 1
        }

        return 0
        
    }


    return Moedas.sort(compare).map(moeda => 
            <option value={moeda.sigla} key={moeda.sigla}>
                {moeda.descricao}
            </option>
    );
}


export default listarMoedas