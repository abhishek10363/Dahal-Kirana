import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDataTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error(error.response.data);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>All Users</h1>
      <table>
        <thead>
          <tr>
            <th>Profile Picture</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td><img src={user.profilePicture} alt={user.name} /></td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.createdAt}</td>
              <td>{user.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDataTable;