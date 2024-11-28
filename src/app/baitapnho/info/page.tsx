import useSWR from "swr";

export default function Info() {

    // const fetcher = (url: string) => fetch(url).then((res) => res.json());
    // const { data, error } = useSWR(`http://localhost:5000/users/${id}`, fetcher, {
    //     refreshInterval: 6000,
    // });
    return (
        <div className="info">Trang thông tin</div>

    );
}