import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import "./editpage.css"

function EditPage() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [action, setAction] = useState('add');
  const history = useHistory();

  useEffect(() => {
    const getInventoryData = async () => {
      try {
        const loginData = JSON.parse(localStorage.getItem('loginData'));
        const promiseResponse = await fetch(`http://localhost:8000/inventory/${id}`, {
          headers: {
            Authorization: `Bearer ${loginData.accessToken}`,
          },
        });
        const result = await promiseResponse.json();
        if (result.error) {
          alert(result.error);
        } else {
          setName(result.name);
        }
      } catch (error) {
        alert('Error: ' + error.message);
        console.log('Failed to get inventory data', error.message);
      }
    };
    getInventoryData();
  }, [id]);

  const handleSave = async () => {
    try {
      const loginData = JSON.parse(localStorage.getItem('loginData'));
      const promiseResponse = await fetch(`http://localhost:8000/inventory/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${loginData.accessToken}`,
        },
        body: JSON.stringify({ action, quantity: parseInt(quantity) }),
      });
      const result = await promiseResponse.json();
      if (result.error) {
        alert(result.error);
      } else {
        history.push('/inventory');
      }
    } catch (error) {
      alert('Error: ' + error.message);
      console.log('Failed to update inventory', error.message);
    }
  };

  return (
    <div className="edit-page">
      <h1 className='update'>Update Inventory</h1>
      <div className="edit-form">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} disabled />
        <label htmlFor="quantity">Quantity:</label>
        <input type="number" id="quantity" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <label htmlFor="action">Action:</label>
        <select id="action" name="action" value={action} onChange={(e) => setAction(e.target.value)}>
          <option value="add">Add</option>
          <option value="remove">Remove</option>
        </select>
        <button className="edit-button" onClick={handleSave}>Save</button>
      </div>
    </div>
  )


}

export default EditPage;
