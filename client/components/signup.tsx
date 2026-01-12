'use client'

import React from 'react';
import axios from 'axios';
import { useState } from 'react';

export default function Signup() {
    // const [password, setPassword] = useState('');
    // const [username, setUsername] = useState('');
    // const [email, setEmail] = useState('');

    // // Handle sign up
    // const handleSignup = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     const data = {
    //         username: username,
    //         email: email,
    //         password: password
    //     };

    //     try{
    //         const response = await axios.post('http://localhost:5000/auth/signup', {
    //             username, email, password
    //         }, { headers: { 'Content-Type': 'application/json' } }
    //         );
            
    //         localStorage.setItem("acces_token", response.data.access_token);
    //         alert("Login Success!");
    //         console.log("Sign up success: ", response.data);
    //     }
    //     catch (err: any){
    //         console.error(
    //             err.response?.data || err.message
    //         );
    //     }
    // };

    // const handleUsernameChange = (e) => {
    //     setUsername(e.target.value);
    // }

    // const handleEmailChange = (e) => {
    //     setEmail(e.target.value);
    // }
    
    // const handlePasswordChange = (e) => {
    //     setPassword(e.target.value);
    // }

    return (
        <div >

            {/* <form method="POST" onSubmit={handleSignup} >
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    required
                    autoComplete="on"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Your email"
                    name="email"
                    required
                    autoComplete="on"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    required
                    placeholder="Your Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                
                <button type="submit">Sign up</button>

            </form> */}
            
        </div>
    );
}

