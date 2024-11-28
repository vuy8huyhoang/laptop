import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import ListCard from "./listcard";

export default function SanPhamLienQuan() {
    const params: any = useParams();
    const [Id, setId] = useState<number | null>(null);
    useEffect(() => {
        if (params?.id) {
            setId(params.id);
        }
    }, [params]);

    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data, error } = useSWR(`http://localhost:3001/splq/${Id}`, fetcher, {
        refreshInterval: 6000,
    });

    if (error) return <div className="text-center text-red-500 font-semibold">Lỗi load dữ liệu.</div>;
    if (!data) return <div className="text-center text-gray-500 text-black font-bold">Đang tải...</div>;
    return (
        <ListCard data={data} />
    );
}
