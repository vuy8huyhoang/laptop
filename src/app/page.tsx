'use client'
import Banner from "./components/banner";
import HeroSection from "./components/heroSection";
import ListCard from "./components/listcard";
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url, { cache: 'no-store' }).then(res => res.json());

export default function SanPham() {
  const { data: productHot, error: errorHot } = useSWR('http://localhost:3001/spmoi/4', fetcher);
  const { data: productCategory1, error: errorCategory1 } = useSWR('http://localhost:3001/spxemnhieu/4', fetcher);
  const { data: productCategory2, error: errorCategory2 } = useSWR('http://localhost:3001/sphot/4', fetcher);

  const errors = [errorHot, errorCategory1, errorCategory2];
  const isLoading = !productHot || !productCategory1 || !productCategory2;

  if (errors.some((err) => err)) {
    return (
      <div className="text-center text-lg font-semibold text-red-500">
        {errorHot && "Lỗi khi tải sản phẩm mới!"}
        {errorCategory1 && "Lỗi khi tải sản phẩm xem nhiều!"}
        {errorCategory2 && "Lỗi khi tải sản phẩm hot!"}
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-center text-lg font-semibold text-gray-500">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <Banner />
      <HeroSection />
      <br />

      <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 tracking-tight mb-8 animate-pulse">
        Sản phẩm mới
      </h2>
      <ListCard data={productHot} />

      <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 tracking-tight mb-8 animate-pulse">
        Sản phẩm xem nhiều
      </h2>
      <ListCard data={productCategory1} />

      <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 tracking-tight mb-8 animate-pulse">
        Sản phẩm hot
      </h2>
      <ListCard data={productCategory2} />
    </div>
  );
}
