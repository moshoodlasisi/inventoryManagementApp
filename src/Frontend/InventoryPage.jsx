import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import "./inventory.css"
import Table from './components/Table';

function InventoryPage() {
  const [inventories, setInventories] = useState([]);
  const [welcomeText, setWelcomeText] = useState('');

  const history = useHistory();

  const getLoginData = () => {
    const loginDataString = localStorage.getItem('loginData');
    return JSON.parse(loginDataString);
  };

  const populateInventoriesTable = (inventories) => {
    setInventories(inventories);
  };

  const getUserInventories = async () => {
    try {
      const loginData = getLoginData();

      const promiseResponse = await fetch('http://localhost:8000/inventory', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${loginData.accessToken}`,
        },
      });

      const InventoriesResult = await promiseResponse.json();

      populateInventoriesTable(InventoriesResult);
    } catch (error) {
      alert('Error: ' + error.message);
      console.log('Failed to fetch inventories', error.message);
    }
  };

  useEffect(() => {
    setWelcomeText(`Welcome ${getLoginData().username}`);
    getUserInventories();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    history.push('/login');
  };

  const handleNewInventory = () => {
    history.push('/addInventory');
  }

  return (
    <div className="container">
      <h1 className="welcome">{welcomeText}</h1>

      <div className="logout-container">
        <button onClick={handleLogout} id="logout">
          Log out
        </button>
      </div>

      <div className="inventories">
        <h1 className="title">Inventories</h1>
      </div>

      <div className="button-container">
        <button onClick={handleNewInventory} id="addInventory">
          Add new inventory
        </button>
      </div>

      <Table inventories={inventories} />
    </div>
  );
}

export default InventoryPage;
