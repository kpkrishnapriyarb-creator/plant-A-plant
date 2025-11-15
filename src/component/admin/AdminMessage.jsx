import React, { useEffect, useState } from "react";
import axios from "axios";
import './AdminMessage.css'
function AdminMessage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/messages")
      .then(res => setMessages(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="admin-messages">
      <h2>Customer Messages </h2>
      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id}>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminMessage;
