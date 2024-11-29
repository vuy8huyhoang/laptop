'use client';
import { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../components/authContext';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { vi } from 'date-fns/locale'; 

export default function Profile() {
    const { accessToken, authenticated,logout } = useAuth();
    const [userData, setUserData] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [changePass, setChangePass] = useState(false);
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

    const changePasswordValidationSchema = Yup.object({
        oldPassword: Yup.string()
            .required("Mật khẩu cũ là bắt buộc")
            .min(6, "Mật khẩu cũ phải có ít nhất 6 ký tự"),

        newPassword: Yup.string()
            .required("Mật khẩu mới là bắt buộc")
            .min(6, "Mật khẩu mới phải có ít nhất 6 ký tự"),

        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'),null], 'Mật khẩu xác nhận không khớp') 
            .required('Vui lòng xác nhận mật khẩu mới'),
    }).required();


    const handleChangePassword = () => {
        
    }


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
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-600 to-blue-500">
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-3">
                <div className="bg-gradient-to-b from-purple-700 to-indigo-700 text-white flex flex-col items-center p-8">
                    <img
                        src={userData.hinh || '/user.png'}
                        alt="User Avatar"
                        className="w-24 h-24 rounded-full shadow-lg mb-4"
                    />
                    <h2 className="text-xl font-bold">{userData.ten}</h2>
                    <p className="text-sm opacity-75">{userData.email}</p>
                    <div className="mt-6 space-y-4 w-full">
                        <button onClick={() => {
                            setChangePass(false);
                        }} className="w-full py-2 bg-purple-600 hover:bg-purple-500 rounded-lg shadow-md">
                            Thông tin tài khoản
                        </button>
                        <button onClick={() => {
                            setChangePass(true);
                        }} className="w-full py-2 bg-purple-600 hover:bg-purple-500 rounded-lg shadow-md">
                            Đổi mật khẩu
                        </button>
                        <button className="w-full py-2 bg-purple-600 hover:bg-purple-500 rounded-lg shadow-md">
                            Theo dõi đơn hàng
                        </button>
                        <button className="w-full py-2 bg-purple-600 hover:bg-purple-500 rounded-lg shadow-md">
                            Lịch sử mua hàng
                        </button>
                        <button onClick={() => {
                            logout();
                        }} className="w-full px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:from-red-600 hover:to-pink-700 transition-transform duration-300 transform hover:-translate-y-1"
                        >
                            Đăng xuất
                        </button>
                    </div>
                </div>

                {changePass === false ? (
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
                                        className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg hover:from-green-600 hover:to-teal-700 transition-transform duration-300 transform hover:-translate-y-1"
                                    >
                                        Cập nhật thông tin
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                ) : (
                    <div className="col-span-2 p-8">
                        <h2 className="text-2xl font-bold text-gray-700 mb-6">Thay đổi mật khẩu</h2>
                        <Formik
                            initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
                            validationSchema={changePasswordValidationSchema}
                            onSubmit={handleChangePassword}
                        >
                            {({ isSubmitting }) => (
                                <Form className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Mật khẩu cũ</label>
                                        <Field
                                            type="password"
                                            name="oldPassword"
                                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                        <ErrorMessage name="oldPassword" component="div" className="text-red-500 text-xs mt-1" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Mật khẩu mới</label>
                                        <Field
                                            type="password"
                                            name="newPassword"
                                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                        <ErrorMessage name="newPassword" component="div" className="text-red-500 text-xs mt-1" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Xác nhận mật khẩu mới</label>
                                        <Field
                                            type="password"
                                            name="confirmPassword"
                                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                        <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs mt-1" />
                                    </div>
                                    <button
                                        type="submit"
                                            className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg hover:from-green-600 hover:to-teal-700 transition-transform duration-300 transform hover:-translate-y-1"
                                    >
                                        Thay đổi mật khẩu
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                )}

            </div>
        </div>
    );
}
