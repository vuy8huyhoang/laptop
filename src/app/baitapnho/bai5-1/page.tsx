'use client';
import { useState } from 'react';

export default function ViduForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        alert(`Email: ${email}, Password: ${password}`);
    };

    return (
        <form onSubmit={handleSubmit} className="container mx-auto max-w-sm">
            <label className="block">Email:</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 mb-6 border border-gray-300"
            />

            <label className="block">Password:</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 mb-6 border border-gray-300"
            />

            <button type="submit" className="bg-blue-500 text-white p-2 block">
                Submit
            </button>
        </form>
    );
}
