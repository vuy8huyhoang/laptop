'use client';
import React, { useState, useEffect } from 'react';
import ListCard from '../components/listcard'; // Ensure ListCard is correctly imported

interface Product {
    id: number;
    ten: string;
    gia_km: number;
    gia: number;
    id_nhasx: number;
    hinh: string;
}

export default function ProductPage() {
    const [data, setData] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortCriteria, setSortCriteria] = useState<string>('name_asc');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100000000);
    const itemsPerPage = 20;

    useEffect(() => {
        fetch('http://localhost:3001/allsp')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((responseData: Product[]) => {
                setData(responseData);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading)
        return <div className="text-center text-lg font-semibold text-gray-500">Đang tải dữ liệu...</div>;
    if (error)
        return <div className="text-center text-lg font-semibold text-red-500">Lỗi: {error}</div>;

    const filteredData = data
        .filter((item) =>
            item.ten.toLowerCase().includes(searchKeyword.toLowerCase())
        )
        .filter((item) => item.gia_km >= minPrice && item.gia_km <= maxPrice);

    const sortedData = filteredData.sort((a, b) => {
        switch (sortCriteria) {
            case 'name_asc':
                return a.ten.localeCompare(b.ten);
            case 'name_desc':
                return b.ten.localeCompare(a.ten);
            case 'price_km_asc':
                return a.gia_km - b.gia_km;
            case 'price_km_desc':
                return b.gia_km - a.gia_km;
            default:
                return 0;
        }
    });

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const paginatedData = sortedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };



    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const getPaginationPages = () => {
        const delta = 2;
        const pages = [];

        for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
            pages.push(i);
        }

        if (currentPage - delta > 1) {
            pages.unshift('...');
        }
        if (currentPage + delta < totalPages) {
            pages.push('...');
        }

        return pages;
    };

    return (
        <div className="mx-auto max-w-7xl px-6 py-16">
            {/* Header tìm kiếm */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="w-full sm:w-1/2 md:w-1/3 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow"
                />
                <select
                    value={sortCriteria}
                    onChange={(e) => setSortCriteria(e.target.value)}
                    className="w-full sm:w-1/4 md:w-1/6 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow"
                >
                    <option value="name_asc">Tên tăng dần</option>
                    <option value="name_desc">Tên giảm dần</option>
                    <option value="price_km_asc">Giá tăng dần</option>
                    <option value="price_km_desc">Giá giảm dần</option>
                </select>
            </div>

            {/* Bộ lọc giá */}
            <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <label htmlFor="minPrice" className="text-sm font-medium text-gray-700">
                        Giá từ: <span className="text-indigo-500">{minPrice.toLocaleString()} VND</span>
                    </label>
                    <input
                        type="range"
                        id="minPrice"
                        min="0"
                        max="100000000"
                        step="100000"
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                        className="w-full appearance-none rounded-lg bg-gray-200 h-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="maxPrice" className="text-sm font-medium text-gray-700">
                        Đến: <span className="text-indigo-500">{maxPrice.toLocaleString()} VND</span>
                    </label>
                    <input
                        type="range"
                        id="maxPrice"
                        min="0"
                        max="100000000"
                        step="100000"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="w-full appearance-none rounded-lg bg-gray-200 h-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </div>

            {/* Danh sách sản phẩm */}
            <ListCard data={paginatedData} />

            <div className="flex justify-center items-center mt-8 space-x-2">
                <button
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                    Đầu tiên
                </button>

                {getPaginationPages().map((page, index) => (
                    typeof page === 'number' ? (
                        <button
                            key={index}
                            onClick={() => handlePageChange(page)}
                            className={`px-4 py-2 rounded-lg shadow-md transition ${page === currentPage
                                ? 'bg-indigo-500 text-white'
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                }`}
                        >
                            {page}
                        </button>
                    ) : (
                        <span key={index} className="px-4 py-2 text-gray-500">...</span>
                    )
                ))}

                <button
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                    Cuối cùng
                </button>
            </div>
        </div>
    );
}
