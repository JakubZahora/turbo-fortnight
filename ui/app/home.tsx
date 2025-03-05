"use client";

import { useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/hello')
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => setMessage('Error fetching data'));
  }, []);

  return (
    <div>
      {message ? message : 'Loading...'}
    </div>
  );
}