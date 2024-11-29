'use client';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as Yup from 'yup';
import { useAuth } from '../../components/authContext';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { BorderBeam } from "@/app/components/ui/border-beam";

const LoginForm = () => {
    const { login } = useAuth();
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email không hợp lệ')
            .required('Vui lòng nhập email'),
        mat_khau: Yup.string()
            .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
            .required('Vui lòng nhập mật khẩu'),
    });

    const handleSubmit = async (values: any) => {
        try {
            const response = await fetch('http://localhost:3001/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            const data = await response.json();

            if (!response.ok) {
                console.log(response);
                if (response.status === 400) {
                    setErrorMessage(data.message || 'Sai tên đăng nhập hoặc mật khẩu');
                }
                if (response.status === 401) {
                    setErrorMessage(data.message || 'Vui lòng xác minh tài khoản trước khi đăng nhập');
                    localStorage.setItem('userEmail', values.email);
                    router.push("/verify");
                }
            }


            if (data.accessToken && data.refreshToken) {
                login(data.accessToken, data.refreshToken);
                setErrorMessage(null);
                router.push('/profile');

            }
        } catch (error) {
            console.error('Lỗi kết nối:', error);
            alert('Không thể kết nối đến API.');
        }
    };


    return (
        <Formik
            initialValues={{
                email: '',
                mat_khau: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched }) => (
                <Form className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#1e3c72] to-[#2a5298] p-6">
                    <div className="relative w-full max-w-lg rounded-3xl mt-[-200px] bg-white/10 backdrop-blur-lg shadow-xl ring-1 ring-white/20 p-10 animate-zoom-in">
                        <BorderBeam size={250} duration={12} delay={9} />

                        <div className="text-center">
                            <img
                                alt="Your Company"
                                src="https://tailwindui.com/plus/img/logos/mark.svg?color=white&shade=700"
                                className="mx-auto h-16 w-auto"
                            />
                            <h2 className="mt-6 text-4xl font-extrabold text-white font-poppins">
                                Đăng nhập tài khoản
                            </h2>
                            <p className="mt-2 text-sm text-gray-200 font-light font-poppins">
                                Chưa có tài khoản?{' '}
                                <Link href="/register" className="font-semibold text-yellow-400 hover:text-yellow-300">
                                    Đăng ký ngay
                                </Link>
                            </p>
                        </div>

                        <div className="mt-8 space-y-6">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-100 font-poppins"
                                >
                                    Địa chỉ Email
                                </label>
                                <div className="mt-2">
                                    <Field
                                        name="email"
                                        type="email"
                                        placeholder="Nhập email của bạn"
                                        className="block w-full rounded-lg border border-gray-300 bg-white/20 py-2 px-4 text-white placeholder-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 sm:text-sm font-poppins"
                                    />

                                </div>
                                <ErrorMessage name="email" component="div" className="m-2 text-red-500 text-xs font-bold" />

                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-100 font-poppins"
                                >
                                    Mật khẩu
                                </label>
                                <div className="mt-2 relative">
                                    <Field
                                        name="mat_khau"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Nhập mật khẩu"
                                        className="block w-full rounded-lg border border-gray-300 bg-white/20 py-2 px-4 text-white placeholder-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 sm:text-sm font-poppins"
                                    />
                                    <div
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FiEyeOff className="text-black" /> : <FiEye className="text-black" />}
                                    </div>
                                </div>
                                <ErrorMessage name="mat_khau" component="div" className="m-2 text-red-500 text-xs font-bold" />

                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full rounded-lg bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 py-3 px-6 text-sm font-bold text-white shadow-lg hover:shadow-xl hover:opacity-90 transition-transform duration-300 ease-in-out transform hover:-translate-y-1 font-poppins"
                                >
                                    Đăng nhập
                                </button>
                            </div>
                        </div>
                        {errorMessage && (
                            <div className="m-2 text-red-500 text-xs font-bold">
                                {errorMessage}
                            </div>
                        )}
                        <div className="mt-2 flex justify-center">
                            <p className="mt-2 text-sm text-gray-200 font-light font-poppins">Bạn quên mật khẩu?
                                <Link
                                    href="/forgot-password"
                                    className="text-sm m-1 font-semibold text-yellow-400 hover:text-yellow-300 font-poppins"
                                >
                                    Quên mật khẩu?
                                </Link>
                            </p>
                        </div>


                        <div className="mt-6">
                            <button
                                type="button"
                                className="flex w-full items-center justify-center gap-3 rounded-lg bg-white/20 py-2 px-4 text-sm font-medium text-white shadow-lg hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 font-poppins"
                            >
                                <img
                                    src="https://www.svgrepo.com/show/355037/google.svg"
                                    alt="Google"
                                    className="h-5 w-5"
                                />
                                Đăng nhập với Google
                            </button>
                        </div>
                    </div>

                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;
