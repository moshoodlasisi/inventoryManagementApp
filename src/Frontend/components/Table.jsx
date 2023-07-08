import { useHistory } from 'react-router-dom';
import "./action.css"

export default function Table(props) {
    const {inventories} = props;
    const history = useHistory();

    const handleEdit = (id) => {
        history.push(`/edit-inventory/${id}`);
    }

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Do you want to delete?');
        if (confirmDelete) {
            try {
                const loginData = JSON.parse(localStorage.getItem('loginData'));
                const promiseResponse = await fetch(`http://localhost:8000/inventory/${id}`, {
                    method:'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${loginData.accessToken}`,
                    },
                });
                const result = await promiseResponse.json();
                if (result.success) {
                    const newInventories = inventories.filter((inventory) => inventory.id !== id);
                    props.setInventories(newInventories);
                } else {
                    alert(result.message);
                }
            } catch (error) {
                alert('Error: ' + error.message);
                console.log('Failed to delete inventory', error.message);
            }
        }
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody id="inventory-table">
                {inventories.map((inventory) => (
                    <tr key={inventory.id}>
                        <td>{inventory.id}</td>
                        <td>{inventory.name}</td>
                        <td>{inventory.quantity}</td>
                        <td>
                            <button className='edit' onClick={() => handleEdit(inventory.id)}>Edit</button>
                            <button className='delete' onClick={() => handleDelete(inventory.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
      </table>
    )
}
