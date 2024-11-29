'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Modal from '../../../components/modal';

const VerifyEmailPage = () => {
    const router = useRouter();
    const params = useParams();
    const token = params.token;
    const [isVerifying, setIsVerifying] = useState(true);
    const [modalMessage, setModalMessage] = useState('Đang xác thực tài khoản của bạn...');

    useEffect(() => {
        const verifyEmail = async () => {
            if (!token) {
                setModalMessage('Thiếu token xác thực');
                setTimeout(() => setIsVerifying(false), 3000);
                return;
            }

           
                const response = await fetch(`http://localhost:3001/users/verify-email?token=${token}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                if (data.status===200) {
                    console.log('Xác thực thành công:', data);
                    setModalMessage('Tài khoản của bạn đã được xác thực thành công!');
                    setTimeout(() => {
                    setIsVerifying(false);
                    router.push('/login');
                    }, 3000);
                }
                else {
                    setModalMessage(data.message || 'Xác thực email thất bại');
                    setTimeout(() => {
                        router.push('/verify');
                    }, 3000);
                }
            
            
        };

        if (token) {
            verifyEmail();
        }
    }, [token]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 p-4">
            <Modal
                isOpen={isVerifying}
                message={modalMessage}
                onClose={() => setIsVerifying(false)}
            />
        </div>
    );
};

export default VerifyEmailPage;
