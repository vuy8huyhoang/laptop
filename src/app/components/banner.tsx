'use client';
import { useState } from 'react';
import ShimmerButton from "./ui/shimmer-button";
import {BorderBeam} from "./ui/border-beam";

import Link from 'next/link';

export default function Banner() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const bannerText = [
        "Chào mừng đến với Vũ Store!",
        "Khám phá những chiếc laptop mới nhất!",
        "Giảm giá cực mạnh cho sinh viên!",
        "Dòng laptop gamming hiệu năng cao!"
    ];

    const pText = [
        "Laptop văn phòng mỏng nhẹ!",
        "Macbook kiểu dáng sang trọng!",
        "Laptop chuyên cho thiết kế đồ họa!",
        "Dòng laptop gamming hiệu năng cao!"
    ];
    const bannerImages = [
        "/laptop (1).png",
        "/laptop (2).png",
        "/laptop (3).png",
        "/laptop (4).png",
    ];

    const bannerButton = [
        "Khám phá ngay",
        "Khám phá ngay",
        "Khám phá ngay",
        "Khám phá ngay",
    ];
    const nextText = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerText.length);
    };

    const prevText = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + bannerText.length) % bannerText.length
        );
    };

    return (
        <div className="relative rounded-[50px]  bg-gradient-to-r from-blue-900 via-purple-800 to-black text-white h-[450px] md:h-[500px] overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <BorderBeam size={250} duration={12} delay={9} />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 md:px-8 flex items-center justify-between w-full space-x-6">
                

                <div className="text-left space-y-6 pl-10 max-w-lg z-10">
                    <h1 className=" w-full text-3xl sm:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 animate-pulse">
                        {bannerText[currentIndex]}
                    </h1>
                    <p className="text-lg sm:text-xl font-light text-gray-300 animate-slide-up">
                        {pText[currentIndex]}
                    </p>
                    <Link href='/products'>
                        <ShimmerButton
                            onClick={nextText}
                            className="mt-6 px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-full shadow-lg hover:bg-indigo-800 transition-all duration-300 transform hover:scale-105"
                        >
                            {bannerButton[currentIndex]}
                        </ShimmerButton>
                    </Link>
                </div>

                <div className="flex justify-center w-[50%] z-10">
                    <img
                        src={bannerImages[currentIndex]}
                        alt={`Laptop ${currentIndex + 1}`}
                        className="w-[1/2] transform scale-95 hover:scale-100 transition-all duration-300"
                    />
                </div>
            </div>

            <button
                onClick={prevText}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-all duration-300 hover:scale-110 z-20"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                onClick={nextText}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-all duration-300 hover:scale-110 z-20"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
}
