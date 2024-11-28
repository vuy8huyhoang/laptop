'use client';
import { addToCart } from "@/redux/slices/cartslice";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function ListCard(props: { data: any[] }) {
    const dispatch = useDispatch();
    return (
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {props?.data?.map((data) => (
                    <div
                        key={data.id}
                        className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-500"
                    >
                        {data.hot === 1 && (
                            <span className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white text-xs font-bold py-1 px-3 rounded-full shadow-lg z-10 animate-bounce">
                                Hot
                            </span>
                        )}

                        {data.gia_km && data.gia_km < data.gia && (
                            <span className="absolute top-2 right-2 bg-gradient-to-r from-teal-400 to-blue-500 text-white text-xs font-bold py-1 px-3 rounded-full shadow-lg z-10">
                                Giảm {Math.round(((data.gia - data.gia_km) / data.gia) * 100)}%
                            </span>
                        )}

                        <Link href={`/productdetail/${data.id}`} passHref>
                            <div>
                                <div className="relative w-full h-[180px] rounded-t-xl overflow-hidden">
                                    <img
                                        src={data.hinh}
                                        alt={data.ten}
                                        className="absolute inset-0 w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                                    />
                                </div>
                                <h3 className="mt-2 text-base font-semibold text-gray-900 group-hover:text-indigo-600 px-4 min-h-[48px]">
                                    {data.ten}
                                </h3>
                            </div>
                        </Link>

                        <div className="mt-2 flex flex-col datas-start p-4">
                            <p className="text-sm font-normal line-through text-gray-500">
                                {data.gia?.toLocaleString('vi-VN')} VND
                            </p>
                            <p className="mt-1 text-lg font-semibold text-rose-600">
                                {data.gia_km?.toLocaleString('vi-VN')} VND
                            </p>
                            <p className="mt-1 text-sm text-gray-600">
                                <span className="text-indigo-600 font-semibold">Lượt xem: </span>{data.xem || 0}
                            </p>

                            <button
                                onClick={() => dispatch(addToCart({ item:data, quantity: 1 }))}
                                className="mt-3 w-full py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm font-bold rounded-lg shadow-md hover:shadow-xl hover:from-purple-600 hover:to-indigo-700 transition-transform duration-300 transform hover:-translate-y-1"
                            >
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
