'use client'

import api from '../../lib/api';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '../../lib/auth';


export default function Dashboard() {
  const [message, setMessage] = useState<string>("loading...");
  const [error, setError] = useState<string>('');
  const [checkingAuth, setCheckingAuth] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    // No token? -> redirect user immediately to login
    if (!token) {
      router.push("/auth/login");
      return;
    }

    // token exists, backend will verify
    const fetchUserData = async () => {
      try{
        const res = await api.get('/api/home');
        setMessage(res.data.message);
      }
      catch (err: any)
      {
        // if token is invalid or expired
        if (err?.response.status == 401) {
          localStorage.removeItem("access_token");  // remove token
          router.push("/auth/login"); // redirect user to login
        }
        else {
          setError("Something went wrong!");
        }
      }
    };

    fetchUserData();
  }, [router]);

  // check auth session
  if (checkingAuth) return <p>Checking session...</p>

  // handle error
  if (error) return <p>{error}</p>

  return (
    <div className="w-full mx-auto px-4 py-6">
      <div className="flex">
        <h1>{message}</h1>

        {/* Button logout */}
        <button
          onClick={() => {
            logout();
            router.push('/auth/login');
          }}
        >
          Logout
        </button>
      </div>
    </div>
    
  );
}
