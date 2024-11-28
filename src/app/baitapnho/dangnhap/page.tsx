'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import bcrypt from 'bcryptjs';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter(); 

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/users?email=' + email);
            const users = await response.json();

            if (!users.length) {
                setError('Email không tồn tại');
                return;
            }

            const user = users[0];
            const isPasswordMatch = await bcrypt.compare(password, user.matkhau);
            
            if (!isPasswordMatch) {
                setError('Mật khẩu không đúng');
                return;
            }

            alert('Đăng nhập thành công');
            if (typeof window !== "undefined") {
                localStorage.setItem('isLogin', "true");
            }
            if (!isLogin) {
                router.push('/baitapnho/info');
            }
        } catch (err:any) {
            console.log(err);
            setError('Đã xảy ra lỗi, vui lòng thử lại');
        }
    };

    return (
        <div className="container mx-auto max-w-sm">
            <form onSubmit={handleSubmit}>
                <label className="block">Email:</label>
                <input
                    type="email"
                    className="p-2 border border-gray-300 w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label className="block mt-4">Mật khẩu:</label>
                <input
                    type="password"
                    className="p-2 border border-gray-300 w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <div className="text-red-500 mt-2">{error}</div>}

                <button type="submit" className="bg-blue-500 text-white p-2 w-full mt-4">
                    Đăng nhập
                </button>
            </form>
        </div>
    );
}
