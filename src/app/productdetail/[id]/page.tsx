"use client";
import { useFavorite } from "@/app/components/favoriteContext";
import SanPhamLienQuan from "@/app/components/sanphamlienquan";
import { addToCart } from "@/redux/slices/cartslice";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";

export default function DetailPage() {
    const params: any = useParams();
    const { addToFavorite, isFavorite, removeFromFavorite } = useFavorite();
    const [Id, setId] = useState<number | null>(null);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const cart = useSelector((state: any) => state.cart);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (params?.id) {
            setId(params.id);
        }
    }, [params]);


    useEffect(() => {
        console.log(quantity);
    }, [quantity]);



    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data, error } = useSWR(`http://localhost:3001/sp/${Id}`, fetcher, {
        refreshInterval: 6000,
    });
    if (error) return <div className="text-center text-red-500 font-semibold">Lỗi load dữ liệu.</div>;
    if (!data) return <div className="text-center text-gray-500 text-black font-bold">Đang tải...</div>;

    const discountPercent =
        data.gia && data.gia_km ? Math.round(((data.gia - data.gia_km) / data.gia) * 100) : 0;



    const handleBuyNow = () => {
        alert("Chức năng 'Mua Ngay' đang được phát triển!");
    };

    return (
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
            <div className="flex flex-col lg:flex-row bg-white shadow-2xl rounded-3xl overflow-hidden">
                <div className="relative w-full lg:w-1/2 p-6">
                    <div className="relative rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                        <img
                            src={data.hinh}
                            alt={data.ten}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 rounded-3xl"
                        />
                        {data.hot === 1 && (
                            <span className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold py-1 px-3 rounded-full shadow-lg animate-bounce">
                                Hot
                            </span>
                        )}
                        {discountPercent > 0 && (
                            <span className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-teal-400 text-white text-xs font-bold py-1 px-3 rounded-full shadow-lg animate-bounce">
                                Giảm {discountPercent}%
                            </span>
                        )}
                    </div>
                </div>

                <div className="w-full lg:w-1/2 p-8 flex flex-col justify-between space-y-6">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800 tracking-tight">{data.ten}</h1>
                        <div className="mt-4 flex items-center space-x-4">
                            <p className="text-lg font-medium text-gray-500 line-through">
                                Giá gốc: {data.gia?.toLocaleString('vi-VN')} VND
                            </p>
                            {discountPercent > 0 && (
                                <span className="bg-red-100 text-red-600 text-sm font-semibold py-1 px-3 rounded-lg">
                                    Giảm {discountPercent}%
                                </span>
                            )}
                        </div>
                        <p className="mt-2 text-3xl font-bold text-red-600">
                            Giá khuyến mãi: {data.gia_km?.toLocaleString('vi-VN')} VND
                        </p>
                        <div className="mt-2 text-sm text-gray-600">
                            <span className="text-indigo-600 font-semibold">Lượt xem: </span>
                            {data.xem || 0}
                        </div>
                    </div>

                    <div className="mt-6 space-y-4 border-t border-gray-200 pt-4">
                        <p className="text-gray-700">
                            <span className="text-black font-semibold">Màu sắc:</span> {data.mau_sac}
                        </p>
                        <p className="text-gray-700">
                            <span className="text-black font-semibold">Cân nặng:</span> {data.can_nang} kg
                        </p>
                        <p className="text-gray-700">
                            <span className="text-black font-semibold">RAM:</span> {data.ram}
                        </p>
                        <p className="text-gray-700">
                            <span className="text-black font-semibold">CPU:</span> {data.cpu}
                        </p>
                        <p className="text-gray-700">
                            <span className="text-black font-semibold">Ổ cứng:</span> {data.dia}
                        </p>
                        <p className="text-gray-700">
                            <span className="text-black font-semibold">Màn hình:</span> {data.man_hinh}
                        </p>
                        <p className="text-gray-700">
                            <span className="text-black font-semibold">Công nghệ màn hình:</span> {data.cong_nghe_man_hinh}
                        </p>
                        <p className="text-gray-700">
                            <span className="text-black font-semibold">Pin:</span> {data.thong_tin_pin}
                        </p>
                        <p className="text-gray-700">
                            <span className="text-black font-semibold">Cổng kết nối:</span> {data.cong_ket_noi}
                        </p>
                    </div>

                    <div className="flex items-center justify-between space-x-4 mt-6">
                        <input
                            type="number"
                            min={1}
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="w-20 border border-gray-300 p-2 rounded-md text-center shadow-sm focus:outline-none focus:ring focus:ring-indigo-400"
                        />
                        <button
                            onClick={() => {
                                dispatch(addToCart({ item: data, quantity: quantity }));
                            }}
                            className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-transform duration-300 transform hover:-translate-y-1"
                        >
                            Thêm vào giỏ hàng
                        </button>
                        <button
                            onClick={handleBuyNow}
                            className="flex-1 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg hover:from-green-600 hover:to-teal-700 transition-transform duration-300 transform hover:-translate-y-1"
                        >
                            Mua Ngay
                        </button>
                        <button
                            onClick={() => {
                                if (isLiked) {
                                    removeFromFavorite(data.id);
                                    isFavorite(data.id);
                                } else {
                                    addToFavorite(data);

                                }
                                setIsLiked(!isLiked);
                            }}
                            className={`p-2 transition-transform duration-300 ${isLiked ? "text-red-500" : "text-gray-400"} hover:scale-125`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill={isLiked ? "currentColor" : "none"}
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-8 h-8"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                />
                            </svg>
                        </button>

                    </div>
                </div>
            </div>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Sản Phẩm Liên Quan</h2>
            <SanPhamLienQuan />
        </div>
    );
}
