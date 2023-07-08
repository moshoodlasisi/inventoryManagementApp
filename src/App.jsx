import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./Frontend/LoginPage";
import InventoryPage from "./Frontend/InventoryPage";
import AddInventoryPage from "./Frontend/AddInventoryPage";
import EditPage from "./Frontend/EditPage";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={LoginPage} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path="/inventory" component={InventoryPage} />
        <Route exact path="/add-inventory" component={AddInventoryPage} />
        <Route exact path="/edit-inventory/:id" component={EditPage} />
      </Switch>
    </Router>
  )
}
