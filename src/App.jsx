import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./Frontend/LoginPage";
import InventoryPage from "./Frontend/InventoryPage";
import AddInventoryPage from "./Frontend/AddInventoryPage";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={LoginPage} />  
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/inventory" component={InventoryPage} />
        <Route exact path="/add-inventory" component={AddInventoryPage} />
      </Switch>
    </BrowserRouter>
  )
}
