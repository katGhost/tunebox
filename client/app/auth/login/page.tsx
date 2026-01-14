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
    

    // Handle login
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await api.post('auth/login', {email, password});
            const { access_token, user } = response.data;

            // Save user and token -> 
        }
        catch (err: any) {
            console.error(err.response || err.message);
        }
    } 

    return (
        <div>Login</div>
    );
}