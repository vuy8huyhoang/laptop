'use client';
import React from 'react';
import { useFavorite } from '../components/favoriteContext';
import Link from 'next/link';
import { addToCart } from '@/redux/slices/cartslice';
import { useDispatch } from 'react-redux';

interface Product {
    id: number;
    ten: string;
    gia: string;
    gia_km: number;
    hinh: string;
    hot: number;
    xem: number;
    quantity: number;
}

export default function Favorites() {
    const { favoriteItems, removeFromFavorite } = useFavorite();
    const handleRemoveFavorite = (id: number) => {
        removeFromFavorite(id);
    };
    const dispatch = useDispatch();
    return (
        <div className="bg-gradient-to-r from-indigo-100 via-purple-200 to-indigo-300  min-h-screen">
            <div className="max-w-7xl mx-auto px-6 ">
                <h1 className="text-lg sm:text-3xl py-8 font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 animate-pulse text-center">
                    Danh sách yêu thích Của Bạn
                </h1>

                {favoriteItems.length === 0 ? (
                    <div className="text-center text-lg text-gray-600">Không có sản phẩm yêu thích.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                        {favoriteItems.map((product) => (
                            <div
                                key={product.id}
                                className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-500"
                            >
                                {product.hot === 1 && (
                                    <span className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white text-xs font-bold py-1 px-3 rounded-full shadow-lg z-20 animate-bounce">
                                        Hot
                                    </span>
                                )}
                                {product.gia_km && product.gia_km < product.gia && (
                                    <span className="absolute top-2 right-2 bg-gradient-to-r from-teal-400 to-blue-500 text-white text-xs font-bold py-1 px-3 rounded-full shadow-lg z-20">
                                        Giảm {Math.round(((product.gia - product.gia_km) / product.gia) * 100)}%
                                    </span>
                                )}
                                <div>
                                    <Link href={`/productdetail/${product.id}`}>
                                        <div className="relative w-full h-[180px] rounded-t-xl overflow-hidden">
                                            <img
                                                src={product.hinh}
                                                alt={product.ten}
                                                className="absolute inset-0 w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                                            />
                                        </div>
                                        <h3 className="mt-2 text-base font-semibold text-gray-900 group-hover:text-indigo-600 px-4 min-h-[48px]">
                                            {product.ten}
                                        </h3>
                                    </Link>
                                </div>

                                <div className="mt-2 flex flex-col items-start p-4">
                                    <p className="text-sm font-normal line-through text-gray-500">
                                        {product.gia?.toLocaleString('vi-VN')} VND
                                    </p>
                                    <p className="mt-1 text-lg font-semibold text-rose-600">
                                        {product.gia_km?.toLocaleString('vi-VN')} VND
                                    </p>
                                    <p className="mt-1 text-sm text-gray-600">
                                        <span className="text-indigo-600 font-semibold">Lượt xem: </span>{product.xem || 0}
                                    </p>
                                    <button
                                        onClick={() => dispatch(addToCart({ item: product, quantity: 1 }))}
                                        className="mt-3 w-full py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm font-bold rounded-lg shadow-md hover:shadow-xl hover:from-purple-600 hover:to-indigo-700 transition-transform duration-300 transform hover:-translate-y-1"
                                    >
                                        Thêm vào giỏ hàng
                                    </button>
                                    <button
                                        onClick={() => handleRemoveFavorite(product.id)}
                                        className="mt-3 w-full py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold rounded-lg shadow-md hover:shadow-lg hover:from-red-600 hover:to-red-700 transition-transform duration-300 transform hover:-translate-y-1"
                                    >
                                        Loại bỏ khỏi yêu thích
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
