'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../../lib/api';
import { useAuthStore } from '../../../stores/auth';


export default function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const setAuth = useAuthStore((state) => state.setAuth);

    // use router
    const router = useRouter();
    

    // Handle login
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await api.post('auth/login', {email, password});
            const { access_token, user } = response.data;

            if (response.status == 200){
                // Save user and token -> remember to save locally
                setAuth(user, access_token);

                localStorage.setItem("access_token", access_token);

                // try and redirect to homepage || dashboard
                router.push('/dashboard');
            }
        }
        catch (err: any) {
            setError(err.response?.data?.msg || err.message);
        }
    } 

    return (
        <div className="w-full max-w-sm mx-auto mt-20 px-4 py-6 bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Welcome back! Login</h2>
            <form onSubmit={handleSubmit}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="mb-3">
                    <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required className="form-input w-full border-gray-300 dark:border-gray-600 dark:bg-zinc-950 dark:text-gray-200 rounded-md p-3" />
                </div>
                <div className="mb-3">
                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="form-input w-full border-gray-300 dark:border-gray-600 dark:bg-zinc-950 dark:text-gray-200 rounded-md p-3" />
                </div>
                <div className="mb-3">
                    <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" required className="form-input w-full border-gray-300 dark:border-gray-600 dark:bg-zinc-950 dark:text-gray-200 rounded-md p-3" />
                </div>
                <div className="mb-4">
                    <button type="submit" className="w-full py-3 bg-emerald-500 text-white rounded-md hover:bg-emerald-700 transition">Login</button>
                </div>
                <div className="mb-3">
                    <p className="text-white text-sm">Do not have an account? Please <a className="signUp text-bold text-emerald-500" href="/auth/signup">Sign up</a></p>
                </div>
            </form>
        </div>
    );
}