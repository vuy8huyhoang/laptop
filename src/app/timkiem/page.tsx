'use client';
import { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import ListCard from '../components/listcard';
import { SearchContext } from '../components/searchContext';

export default function SearchPage() {
    const { keyword } = useContext(SearchContext);
    const [displayCount, setDisplayCount] = useState(4);
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data, error } = useSWR('http://localhost:3001/allsp', fetcher, {
        refreshInterval: 6000,
    });

    useEffect(() => {
        if (data) {
            console.log("Fetched data:", data);
        }
    }, [data]);

    if (error) return <div>Lỗi load dữ liệu.</div>;
    if (!data) return <div>Đang tải ...</div>;

    const searchResult = data.filter((item: any) =>
        item.ten.toLowerCase().includes(keyword?.toLowerCase() || "")
    );

    const handleLoadMore = () => {
        setDisplayCount((prevCount) => prevCount + 4);
    };

    return (
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="font-bold text-xl">
                Kết quả tìm kiếm với từ khóa "{keyword}"
            </h1>
            <br />

            <ListCard data={searchResult.slice(0, displayCount)} />
            <div className='max-w flex justify-center'>
            {searchResult.length > displayCount && (
                <button
                    onClick={handleLoadMore}
                        className="mt-6 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-green-500 hover:to-blue-600 transition-transform duration-300 transform hover:-translate-y-1"
                >
                    Xem thêm kết quả tìm kiếm
                </button>
                )}
            </div>
        </div>
    );
}
