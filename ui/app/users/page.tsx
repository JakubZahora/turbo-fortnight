"use client";
import Link from "next/link";

import { useEffect, useState } from 'react';

interface User {
  id: string;
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

  return (
    <div>
      {users.length === 0 ? (
        'Loading...'
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.username} ({user.email})
            </li>
          ))}
        </ul>
      )}
      {/* Return Button */}
      <div style={{ marginTop: "1rem" }}>
        <Link href="/">
          <button 
            style={{ 
              backgroundColor: 'white', 
              border: '1px solid #ccc', 
              padding: '0.5rem 1rem', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
            Return Home
          </button>
        </Link>
      </div>
    </div>
  );
}