'use client';
import { useContext, useEffect } from 'react';
import useSWR from 'swr';
import ListCard from '../components/listcard';
import { SearchContext } from '../components/searchContext';

export default function SearchPage() {
    const { keyword } = useContext(SearchContext);

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

    const searchResult = data
        .filter((item: any) =>
            item.ten.toLowerCase().includes(keyword?.toLowerCase() || "")
        )
        .slice(0, 5);

    return (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h1 className="font-bold text-xl">
                Kết quả tìm kiếm với từ khóa "{keyword}"
            </h1>
            <br />
            <ListCard data={searchResult} />
        </div>
    );
}
