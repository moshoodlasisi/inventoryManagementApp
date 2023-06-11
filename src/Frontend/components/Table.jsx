export default function Table(props) {
    const {inventories} = props

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody id="inventory-table">
                {inventories.map((inventory) => (
                    <tr key={inventory.id}>
                        <td>{inventory.id}</td>
                        <td>{inventory.name}</td>
                        <td>{inventory.quantity}</td>
                    </tr>
                ))}
            </tbody>
      </table>
    )
}
