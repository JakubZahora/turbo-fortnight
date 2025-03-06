"use client";

import { useEffect, useState } from 'react';

interface User {
  uid: string;
  username: string;
  email: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/get_users')
      .then((response) => response.json())
      .then((data) => {
        console.log("Users data:", data); // Inspect the data
        setUsers(data); // assume data is an array of users
      })
      .catch((error) => setError('Error fetching data'));
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div>
      {users.length === 0 ? (
        'Loading...'
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.uid}>
              {user.username} ({user.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}