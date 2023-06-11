import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./Frontend/LoginPage";
import { InventoryPage } from "./Frontend/InventoryPage";
import { AddInventoryPage } from "./Frontend/AddInventoryPage";





export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/addInventory" element={<AddInventoryPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}