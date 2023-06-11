import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "./addInventory.css"

function AddInventoryPage() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const loginDataString = localStorage.getItem('loginData');
      const loginData = JSON.parse(loginDataString);

      const promiseResponse = await fetch('http://localhost:8000/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loginData.accessToken}`
        },
        body: JSON.stringify({
          name,
          quantity
        })
      });

      const response = await promiseResponse.json();

      if (response) {
        const promiseResponse = await fetch('http://localhost:8000/inventory', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${loginData.accessToken}`
          },
        });

        const inventories = await promiseResponse.json();
        populateInventoriesTable(inventories);
        history.push('/inventory');
        
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h2>Create new Inventory</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={name} onChange={(event) => setName(event.target.value)} /><br />
      
        <label htmlFor="quantity">Quantity</label>
        <input type="number" id="quantity" name="quantity" value={quantity} onChange={(event) => setQuantity(event.target.value)} /><br />
      
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default AddInventoryPage;
