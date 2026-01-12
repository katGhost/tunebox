'use client'

import { useState } from 'react';
import api from '../../../lib/api';
import { useAuthStore } from '../../../stores/auth';


export default function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const setAuth = useAuthStore((state) => state.setAuth);
    

    // Handle sign up
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try{
            const response = await api.post('/auth/signup', {
                username, email, password
            });
            
            const { access_token, user } = response.data;

            // Save user and token tos store [always hide store]
            setAuth(user, access_token);

            localStorage.setItem("acces_token", response.data.access_token);
            alert("Sign up Success!");
            //console.log("Sign up success: ", response.data);
        }
        catch (err: any){
            console.error(
                err.response?.data || err.message
            );
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" required />
            <button type="submit">Sign Up</button>
        </form>
    );
}