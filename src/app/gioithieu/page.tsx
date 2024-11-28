'use client';

import { ShoppingCartIcon, UserIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import Link from "next/link";
import './gioithieu.css'; 

export default function GioiThieu() {
    return (
        <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
            <section className="relative h-screen flex flex-col items-center justify-center text-center bg-gradient-to-r from-indigo-800 via-purple-700 to-blue-900 shadow-inner">
                <div className="relative flex items-center justify-center mb-8 laptop-animation">
                    <div className="relative w-64 h-32 bg-gray-800 rounded-t-lg shadow-lg">
                        <div className="absolute w-full h-1 bg-gray-600 top-full"></div>
                        <div className="absolute inset-0 bg-gray-800 rounded-lg transform origin-bottom"></div>
                        <div className="absolute w-full h-16 bg-gray-900 bottom-0 rounded-b-lg"></div>
                    </div>
                </div>
                <h1 className="text-5xl bounce-slow sm:text-6xl font-extrabold tracking-tight mb-4  animate-text-glow animate-text-shake">
                    Chào mừng đến với <span className="text-indigo-400">Vũ Store</span>
                </h1>

                <p className="text-lg sm:text-xl text-gray-300 mb-8 animate-fade-in">
                    Nơi hội tụ những dòng laptop hiện đại, mạnh mẽ và sang trọng.
                </p>
                <Link
                    href="/products"
                    className="px-8 py-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105"
                >
                    Khám phá ngay
                </Link>
            </section>

            <section className="py-16 px-6 sm:px-12 bg-gray-800">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-8 animate-slide-in-left">
                        Về <span className="text-indigo-400">Vũ Store</span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-12 animate-slide-in-left">
                        Vũ Store mang đến các dòng laptop chính hãng với hiệu năng đỉnh cao, kiểu dáng sang trọng từ những thương hiệu hàng đầu thế giới.
                        Chúng tôi cam kết mang lại trải nghiệm tốt nhất cho khách hàng.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300 text-center">
                            <ShoppingCartIcon className="h-12 w-12 text-indigo-400 mx-auto mb-4 animate-pulse" />
                            <h3 className="text-2xl font-bold text-indigo-400 mb-4">Đa dạng sản phẩm</h3>
                            <p className="text-gray-300">
                                Từ laptop gaming mạnh mẽ đến laptop văn phòng siêu nhẹ, đáp ứng mọi nhu cầu của bạn.
                            </p>
                        </div>
                        <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300 text-center">
                            <UserIcon className="h-12 w-12 text-indigo-400 mx-auto mb-4 animate-bounce" />
                            <h3 className="text-2xl font-bold text-indigo-400 mb-4">Hỗ trợ tận tâm</h3>
                            <p className="text-gray-300">
                                Đội ngũ tư vấn chuyên nghiệp, luôn đồng hành cùng bạn trong suốt hành trình trải nghiệm.
                            </p>
                        </div>
                        <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300 text-center">
                            <ShieldCheckIcon className="h-12 w-12 text-indigo-400 mx-auto mb-4 animate-pulse" />
                            <h3 className="text-2xl font-bold text-indigo-400 mb-4">Chính sách bảo hành</h3>
                            <p className="text-gray-300">
                                Cam kết bảo hành chính hãng, đổi trả dễ dàng với dịch vụ hậu mãi hàng đầu.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gradient-to-r from-indigo-700 via-purple-600 to-indigo-800 text-center shadow-inner">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-6 animate-slide-in-left">
                        Sẵn sàng nâng cấp trải nghiệm của bạn?
                    </h2>
                    <p className="text-gray-200 text-lg mb-8 animate-slide-in-left">
                        Hãy khám phá những dòng sản phẩm laptop chất lượng cao tại Vũ Store ngay hôm nay!
                    </p>
                    <Link
                        href="/products"
                        className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-full hover:bg-gray-200 shadow-xl transition-all duration-300 hover:scale-105"
                    >
                        Xem sản phẩm
                    </Link>
                </div>
            </section>
        </div>
    );
}
