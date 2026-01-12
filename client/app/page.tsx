'use client'

import { useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState("loading...");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:5000/api/home');
      const result = await res.json();
      setMessage(result.message);
    };

    fetchData();
  }, []);

  if (!message) return <div>Loading...</div>;

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}
