'use client';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';

const SignupForm = () => {
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email không hợp lệ')
            .required('Vui lòng nhập email'),
        password: Yup.string()
            .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
            .required('Vui lòng nhập mật khẩu'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Mật khẩu không khớp')
            .required('Vui lòng nhập lại mật khẩu'),
    });

    const handleSubmit = async (values: any) => {
        try {
            const hashedPassword = await bcrypt.hash(values.password, 10); 

            const user = {
                id: Date.now(), 
                ten: 'Người dùng mới',
                email: values.email,
                hinh: 'https://via.placeholder.com/150', 
                matkhau: hashedPassword,
            };

            const response = await fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Đăng ký thành công:', data);
                alert('Đăng ký thành công!');
            } else {
                console.error('Lỗi khi đăng ký:', response.statusText);
                alert('Có lỗi xảy ra khi đăng ký!');
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
                password: '',
                confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched }) => (
                <Form className="container mx-auto max-w-sm">
                    <label className="block">Email:</label>
                    <Field
                        name="email"
                        type="email"
                        className="p-2 border border-gray-300"
                    />
                    <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500"
                    />

                    <label className="block">Mật khẩu:</label>
                    <Field
                        name="password"
                        type="password"
                        className="p-2 border border-gray-300"
                    />
                    <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500"
                    />

                    <label className="block">Nhập lại mật khẩu:</label>
                    <Field
                        name="confirmPassword"
                        type="password"
                        className="p-2 border border-gray-300"
                    />
                    <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-red-500"
                    />

                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 block mt-4"
                    >
                        Đăng ký
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default SignupForm;
