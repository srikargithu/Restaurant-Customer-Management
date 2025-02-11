import React, { useState } from 'react';
import './App.css';

function App() {
  const [guestCount, setGuestCount] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [customers, setCustomers] = useState([]);
  const totalCapacity = 50;

  const addCustomer = (e) => {
    e.preventDefault();
    const seatsLeft = totalCapacity - customers.reduce((acc, curr) => acc + (curr.status !== 'Checked Out' ? curr.guestCount : 0), 0);
    if (guestCount > seatsLeft) {
      alert('No seats left!');
      return;
    }
    const newCustomer = { guestCount, name, phone, checkIn: '', checkOut: '', status: 'Pending' };
    setCustomers([...customers, newCustomer]);
    setGuestCount(1);
    setName('');
    setPhone('');
  };

  const checkInCustomer = (index) => {
    const updatedCustomers = [...customers];
    updatedCustomers[index].checkIn = new Date().toLocaleString();
    updatedCustomers[index].status = 'Checked In';
    setCustomers(updatedCustomers);
  };

  const checkOutCustomer = (index) => {
    const updatedCustomers = [...customers];
    updatedCustomers[index].checkOut = new Date().toLocaleString();
    updatedCustomers[index].status = 'Checked Out';
    setCustomers(updatedCustomers);
  };

  const seatsLeft = totalCapacity - customers.reduce((acc, curr) => acc + (curr.status !== 'Checked Out' ? curr.guestCount : 0), 0);

  return (
    <div className="App">
      <h1>Restaurant Customer Management</h1>
      <div className="capacity-info">
        <div className="box">Total Capacity: {totalCapacity}</div>
        <div className="box">Seats Left: {seatsLeft > 0 ? seatsLeft : 'No seats left'}</div>
      </div>
      <form onSubmit={addCustomer}>
        <label>
          Guest Count:
          <input type="number" value={guestCount} onChange={(e) => setGuestCount(Number(e.target.value))} min="1" required />
        </label>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Phone:
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </label>
        <button type="submit">Add Customer</button>
      </form>
      <h2>Customer List</h2>
      <table>
        <thead>
          <tr>
            <th>Count</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.guestCount}</td>
              <td>{customer.name}</td>
              <td>{customer.phone}</td>
              <td>{customer.checkIn}</td>
              <td>{customer.checkOut}</td>
              <td>{customer.status}</td>
              <td>
                {customer.status === 'Pending' && <button onClick={() => checkInCustomer(index)}>Check In</button>}
                {customer.status === 'Checked In' && <button onClick={() => checkOutCustomer(index)}>Check Out</button>}
                <button onClick={() => setCustomers(customers.filter((_, i) => i !== index))}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;