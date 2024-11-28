"use client";
import React, { useState } from "react";
import Modal from "../../components/modal";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Verify() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Email không hợp lệ")
            .required("Vui lòng nhập email"),
    });

    const handleSubmit = async (values: { email: string }) => {
        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("http://localhost:3001/users/resend-verification-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (response.ok) {
                console.log(response);
                setMessage("Mã xác thực đã được gửi lại. Vui lòng kiểm tra email.");
                setIsModalOpen(true);
            } else {
                setMessage(data.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
            }
        } catch (error) {
            setMessage("Lỗi kết nối. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#1e3c72] to-[#2a5298] p-6">
            <div className="relative mt-[-100px] w-full max-w-lg rounded-3xl bg-white/10 backdrop-blur-lg shadow-xl ring-1 ring-white/20 p-5">
                <div className="text-center">
                    <svg
                        className="mx-auto h-16 w-auto text-indigo-500 animate-bounce"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-9 4v8m-6-2a4 4 0 018 0"
                        />
                    </svg>
                    <h1 className="mt-6 text-4xl font-extrabold text-white font-poppins">
                        Xác minh Email
                    </h1>
                    <p className="mt-2 text-sm text-gray-200 font-light font-poppins">
                        Nhập email đã đăng ký để nhận lại mã xác thực tài khoản của bạn.
                    </p>
                </div>

                <div className="mt-8 space-y-6">
                    {/* Formik Form */}
                    <Formik
                        initialValues={{ email: "" }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-100 font-poppins"
                                    >
                                        Nhập địa chỉ Email đã đăng ký
                                    </label>
                                    <Field
                                        name="email"
                                        type="email"
                                        placeholder="Nhập email của bạn"
                                        className={`block w-full mt-2 rounded-lg border border-gray-300 bg-white/20 py-2 px-4 text-white placeholder-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 sm:text-sm font-poppins ${errors.email && touched.email ? "border-red-500" : ""
                                            }`}
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="m-2 text-red-500 text-xs font-bold"
                                    />
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full rounded-lg bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 py-3 px-6 text-sm font-bold text-white shadow-lg hover:shadow-xl hover:opacity-90 transition-transform duration-300 ease-in-out transform hover:-translate-y-1 font-poppins ${loading ? "bg-gray-400" : ""
                                            }`}
                                    >
                                        {loading ? "Đang gửi..." : "Gửi mã xác thực"}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>

                    {message && (
                        <p className="text-center text-sm mt-4 text-red-500">{message}</p>
                    )}

                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                message={message}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}
