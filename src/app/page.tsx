import Banner from "./components/banner";
import HeroSection from "./components/heroSection";
import ListCard from "./components/listcard";

export default async function SanPham() {
  const productHot = await fetch('http://localhost:3001/spmoi/4', { cache: 'no-store' })
    .then((response) => response.json());

  const productCategory1 = await fetch('http://localhost:3001/spxemnhieu/4', { cache: 'no-store' })
    .then((response) => response.json());

  const productCategory2 = await fetch('http://localhost:3001/sphot/4', { cache: 'no-store' })
    .then((response) => response.json());

  return (

    <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8 ">
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
