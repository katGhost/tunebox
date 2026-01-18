'use client'

import api from '../../lib/api';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';


export default function Dashboard() {
  const [message, setMessage] = useState<string>("loading...");
  const [error, setError] = useState<string>('');
  const [checkingAuth, setCheckingAuth] = useState('');
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
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
          localStorage.removeItem('access_token');  // remove token
          router.push('/auth/login'); // redirect user to login
        }
        else {
          setError('Something went wrong!');
        }
      }
    };

    fetchUserData();
  }, [isAuthenticated, router]);

  // check auth session
  if (checkingAuth) return <p>Checking session...</p>

  // handle error
  if (error) return <p>{error}</p>

  return (
    <div className="w-full mx-auto px-4 py-6">
      {/* header */}
      <header>
        {/* music stuff navigator */}
        <div className="pb-4 md:pb-8 flex justify-between items-cente">
          {/* Linking */}
          <Link href="/tracks" className="text-md font-medium text-zinc-700 hover:text-emerald-500 dark:text-gray-300 dark:hover:text-emerald-400">Tracks</Link>
          <Link href="/artists" className="text-md font-medium text-zinc-700 hover:text-emerald-500 dark:text-gray-300 dark:hover:text-emerald-400">Artists</Link>
          <Link href="/albums" className="text-md font-medium text-zinc-700 hover:text-emerald-500 dark:text-gray-300 dark:hover:text-emerald-400">Albums</Link>
          <Link href="/albums" className="text-md font-medium text-zinc-700 hover:text-emerald-500 dark:text-gray-300 dark:hover:text-emerald-400">Me</Link>
          <button onClick={logout} className="text-md font-medium text-zinc-700 hover:text-emerald-500 dark:text-gray-300 dark:hover:text-emerald-400">logout</button>
        </div>
      </header>
    </div>
    
  );
}
