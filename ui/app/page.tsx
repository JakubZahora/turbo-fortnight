"use client";

import { useEffect, useState } from 'react';
import Link from "next/link";

export default function Home() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch('/api/hello')
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => setMessage('Error fetching data'));
  }, []);

  return (
    <div>
      {message}
      <div style={{ marginTop: "1rem" }}>
        <Link href="/users">
          <button style={{ 
              backgroundColor: 'white', 
              border: '1px solid #ccc', 
              padding: '0.5rem 1rem', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
            Go to Users</button>
        </Link>
      </div>
    </div>
  );
}