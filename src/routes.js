import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Conversor from './Components/Conversor/Conversor'
import Home from './Components/Outros/Home'
import Calculadora from './Components/Calculadora/Calculadora'
import GerenciadorDeTarefas from './Components/GerenciadorDeTarefas/GerenciadorDeTarefas'

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/conversor" component={Conversor}/>
                <Route path="/calculadora" component={Calculadora}/>
                <Route path="/gerenciador" component={GerenciadorDeTarefas}/>
            </Switch>
        </BrowserRouter>
    )
    
}

export default Router