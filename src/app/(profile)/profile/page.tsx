'use client';
import { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../components/authContext';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { vi } from 'date-fns/locale'; 
import { format } from 'date-fns';

export default function Profile() {
    const { accessToken, authenticated,logout } = useAuth();
    const [userData, setUserData] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!authenticated || !accessToken) {
            setUserData(null);
            setError(null);
            return;
        }

        const fetchProfile = async () => {
            try {
                const response = await fetch('http://localhost:3001/users/profile', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const data = await response.json();

                if (response.ok && data.message === 'Lấy thông tin người dùng thành công') {
                    setUserData(data.user);
                } else {
                    setError(data.message || 'Failed to fetch user data');
                }
            } catch (err) {
                setError('Error fetching user data: ' + (err instanceof Error ? err.message : 'Unknown error'));
            }
        };

        fetchProfile();
    }, [authenticated, accessToken]);

    const validationSchema = Yup.object().shape({
        ten: Yup.string().required('Tên là bắt buộc'),
        email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
        so_dien_thoai: Yup.string()
            .matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ')
            .required('Số điện thoại là bắt buộc'),
        dia_chi: Yup.string().required('Địa chỉ là bắt buộc'),
        ngay_sinh: Yup.date().required('Ngày sinh là bắt buộc').nullable(),
    });

    const handleUpdate = async (values: User) => {
        try {
            const response = await fetch('http://localhost:3001/users/update', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (response.ok && data.message === 'Cập nhật thông tin thành công') {
                setUserData(values);
            } else {
                setError(data.message || 'Failed to update user data');
            }
        } catch (err) {
            setError('Error updating user data: ' + (err instanceof Error ? err.message : 'Unknown error'));
        }
    };

    if (error) {
        return <div className="text-red-500 text-center mt-10 text-lg">Error: {error}</div>;
    }

    if (!userData) {
        return <div className="text-center mt-10 text-lg text-gray-600">Đang tải thông tin...</div>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-600 to-blue-500 p-2">
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-3">
                <div className="bg-gradient-to-b from-purple-700 to-indigo-700 text-white flex flex-col items-center p-2">
                    <img
                        src={userData.hinh || '/user.png'}
                        alt="User Avatar"
                        className="w-24 h-24 rounded-full shadow-lg mb-4"
                    />
                    <h2 className="text-xl font-bold">{userData.ten}</h2>
                    <p className="text-sm opacity-75">{userData.email}</p>
                    <div className="mt-6 space-y-4 w-full">
                        <button className="w-full py-2 bg-purple-600 hover:bg-purple-500 rounded-lg shadow-md">
                            Cài đặt
                        </button>
                        <button className="w-full py-2 bg-purple-600 hover:bg-purple-500 rounded-lg shadow-md">
                            Bảo mật
                        </button>
                        <button onClick={() => {
                            logout();
                        }} className="w-full py-2 bg-red-500 hover:bg-red-400 rounded-lg shadow-md">
                            Đăng xuất
                        </button>
                    </div>
                </div>

                <div className="col-span-2 p-8">
                    <h2 className="text-2xl font-bold text-gray-700 mb-6">Cập nhật hồ sơ cá nhân</h2>
                    <Formik
                        initialValues={{ ...userData, ngay_sinh: userData.ngay_sinh || '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleUpdate}
                    >
                        {({ isSubmitting, setFieldValue, values }) => (
                            <Form className="space-y-6">
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <Field
                                        type="email"
                                        name="email"
                                        disabled
                                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Tên</label>
                                    <Field
                                        type="text"
                                        name="ten"
                                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                    <ErrorMessage name="ten" component="div" className="text-red-500 text-xs mt-1" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                                    <Field
                                        type="text"
                                        name="so_dien_thoai"
                                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                    <ErrorMessage name="so_dien_thoai" component="div" className="text-red-500 text-xs mt-1" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                                    <Field
                                        type="text"
                                        name="dia_chi"
                                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                    <ErrorMessage name="dia_chi" component="div" className="text-red-500 text-xs mt-1" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Ngày Sinh</label>
                                    <DatePicker
                                        selected={values.ngay_sinh ? new Date(values.ngay_sinh) : null}
                                        onChange={(date) => setFieldValue('ngay_sinh', date)}
                                        dateFormat="dd/MM/yyyy"
                                        locale={vi} 
                                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholderText="Chọn ngày sinh"
                                    />
                                    <ErrorMessage name="ngay_sinh" component="div" className="text-red-500 text-xs mt-1" />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition font-medium shadow-md"
                                >
                                    Cập nhật thông tin
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}
