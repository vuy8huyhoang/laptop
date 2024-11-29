'use client';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as Yup from 'yup';
import Modal from "../../components/modal";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { BorderBeam } from "@/app/components/ui/border-beam";

const SignupForm = () => {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const validationSchema = Yup.object().shape({
        ten: Yup.string()
            .required('Vui lòng nhập họ và tên'),
        email: Yup.string()
            .email('Email không hợp lệ')
            .required('Vui lòng nhập email'),
        mat_khau: Yup.string()
            .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
            .required('Vui lòng nhập mật khẩu'),
        nhaplaimatkhau: Yup.string()
            .oneOf([Yup.ref('mat_khau')], 'Mật khẩu không khớp')
            .required('Vui lòng nhập lại mật khẩu'),
    });

    const handleSubmit = async (values: any) => {
        try {
            const response = await fetch('http://localhost:3001/users/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            const data = await response.json();
            if (!response.ok) {
                switch (response.status) {
                    case 400:
                        setErrorMessage(data.message || 'Email đã tồn tại');
                        break;

                    default:
                        setErrorMessage('Đã xảy ra lỗi. Vui lòng thử lại sau.');
                }
                return;
            }
            if (response.status === 200 || response.status === 201) {
                localStorage.setItem('userEmail', values.email);
                setIsModalOpen(true);
                setMessage(data.message || 'Đăng ký thành công.Vui lòng kiểm tra email để kích hoạt tài khoản.');
  
            }
        } catch (error) {
            console.log('Lỗi kết nối:', error);
            alert('Không thể kết nối đến API.');
        }
    };

    return (
        <Formik
            initialValues={{
                ten: '',
                email: '',
                mat_khau: '',
                nhaplaimatkhau: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched }) => (
                <Form className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#1e3c72] to-[#2a5298] p-6">
                    <div className="relative mt-[-100px] w-full max-w-lg rounded-3xl bg-white/10 backdrop-blur-lg shadow-xl ring-1 ring-white/20 p-5">
                        <BorderBeam size={250} duration={12} delay={9} />

                        <div className="text-center">
                            <img
                                alt="Your Company"
                                src="https://tailwindui.com/plus/img/logos/mark.svg?color=white&shade=700"
                                className="mx-auto h-16 w-auto"
                            />
                            <h2 className="mt-6 text-4xl font-extrabold text-white font-poppins">
                                Đăng ký tài khoản
                            </h2>
                            <p className="mt-2 text-sm text-gray-200 font-light font-poppins">
                                Đã có tài khoản?{' '}
                                <Link href="/login" className="font-semibold text-yellow-400 hover:text-yellow-300">
                                    Đăng nhập ngay
                                </Link>
                            </p>
                        </div>

                        <div className="mt-8 space-y-6">
                            <div>
                                <label
                                    htmlFor="ten"
                                    className="block text-sm font-medium text-gray-100 font-poppins"
                                >
                                    Họ và tên
                                </label>
                                <div className="mt-2">
                                    <Field
                                        name="ten"
                                        type="text"
                                        placeholder="Nhập họ và tên của bạn"
                                        className="block w-full rounded-lg border border-gray-300 bg-white/20 py-2 px-4 text-white placeholder-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 sm:text-sm font-poppins"
                                    />
                                    <ErrorMessage name="ten" component="div" className="m-2 text-red-500 text-xs font-bold" />
                                </div>
                            </div>

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
                                    <ErrorMessage name="email" component="div" className="m-2 text-red-500 text-xs font-bold" />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="mat_khau"
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
                                <label
                                    htmlFor="nhaplaimatkhau"
                                    className="block text-sm font-medium text-gray-100 font-poppins"
                                >
                                    Xác nhận mật khẩu
                                </label>
                                <div className="mt-2 relative">
                                    <Field
                                        name="nhaplaimatkhau"
                                        type={showPassword2 ? "text" : "password"}
                                        placeholder="Nhập lại mật khẩu"
                                        className="block w-full rounded-lg border border-gray-300 bg-white/20 py-2 px-4 text-white placeholder-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 sm:text-sm font-poppins"
                                    />
                                    <div
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                        onClick={() => setShowPassword2(!showPassword2)}
                                    >
                                        {showPassword2 ? <FiEyeOff className="text-black" /> : <FiEye className="text-black" />}
                                    </div>

                                </div>
                                <ErrorMessage
                                    name="nhaplaimatkhau"
                                    component="div"
                                    className="m-2 text-red-500 text-xs font-bold"
                                />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full rounded-lg bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 py-3 px-6 text-sm font-bold text-white shadow-lg hover:shadow-xl hover:opacity-90 transition-transform duration-300 ease-in-out transform hover:-translate-y-1 font-poppins"
                                >
                                    Đăng ký
                                </button>
                            </div>
                        </div>
                        {errorMessage && (
                            <div className="m-2 text-red-500 text-xs font-bold">
                                {errorMessage}
                            </div>
                        )}


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
                                Đăng ký với Google
                            </button>
                        </div>

                    </div>
                    <Modal
                        isOpen={isModalOpen}
                        message={message}
                        onClose={() => setIsModalOpen(false)}
                    />
                </Form>

            )}

        </Formik>
    );
};

export default SignupForm;
