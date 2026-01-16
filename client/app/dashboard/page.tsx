'use client'

import { useEffect, useState } from 'react';
import api from '../../lib/api';

export default function Dashboard() {
  const [message, setMessage] = useState("loading...");
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try{
        const res = await api.get('/api/home');
        setMessage(res.data.message);
      }
      catch (err: any)
      {
        setError(err.response?.data.msg || "Unauthorized");
      }
    };

    fetchUserData();
  }, []);

  // handle data loading state
  if (!message) return <div>Loading...</div>;

  // handle error
  if (error) return <p>{error}</p>

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}
