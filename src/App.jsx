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
    const newCustomer = { guestCount, name, phone, checkIn: '', checkOut: '', status: 'Pending' };
    setCustomers([...customers, newCustomer]);
    setGuestCount(1);
    setName('');
    setPhone('');
  };

  const seatsLeft = totalCapacity - customers.length;

  return (
    <div className="App">
      <h1>Restaurant Customer Management</h1>
      <div className="capacity-info">
        <div className="box">Total Capacity: {totalCapacity}</div>
        <div className="box">Seats Left: {seatsLeft}</div>
      </div>
      <form onSubmit={addCustomer}>
        <label>
          Guest Count:
          <input type="number" value={guestCount} onChange={(e) => setGuestCount(e.target.value)} min="1" required />
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
            <th>Remove Entry</th>
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