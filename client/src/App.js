import { BrowserRouter, Route, Switch } from "react-router-dom";
import Welcome from "./components/welcome/Welcome";
import Home from "./components/home/Home";
import CardDetail from "./components/cardDetail/CardDetail";
import CreateVideoGame from "./components/createVideoGame/CreateVideoGame";
import NotFound from "./components/notFound/NotFound";

import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Welcome}></Route>
                <Route path="/home" component={Home}></Route>
                <Route path="/detail/:id" component={CardDetail}></Route>
                <Route path="/newgame" component={CreateVideoGame}></Route>
                <Route path="*" component={() => (<NotFound msg="Error 404 - Pagina no existe!"/>)}></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
