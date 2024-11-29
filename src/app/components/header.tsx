'use client';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import useSWR from 'swr';

import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Popover,
    PopoverGroup,
} from '@headlessui/react';
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon, HeartIcon, UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { SearchContext } from './searchContext';
import { useFavorite } from './favoriteContext';
import { useAuth } from './authContext';
import { useSelector } from 'react-redux';

const navigation = {
    pages: [
        { name: 'Sản phẩm', href: '/products', icon: '/laptop (4).png' },
    ],
};
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Example() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const { keyword, setKeyword } = useContext(SearchContext);
    const { favoriteItems } = useFavorite();
    const favoritesCount = favoriteItems.length;
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const { authenticated, logout } = useAuth();
    const cartItems = useSelector((state: any) => state.cart?.items || []);
    const count = cartItems.length;

    const { data: manufacturers, error } = useSWR('http://localhost:3001/list_nhasx', fetcher);

    if (error) {
        console.log(error);
    }

    return (
        <div className="fixed top-0 right-0 mb-[120px] w-full z-50 bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 text-white">
            <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300"
                />
                <div className="fixed inset-0 z-40 flex">
                    <DialogPanel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                        <div className="flex px-4 pb-2 pt-5">
                            <button
                                type="button"
                                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                onClick={() => setOpen(false)}
                            >
                                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                            {navigation.pages.map((page) => (
                                <div key={page.name} className="flow-root">
                                    <Link href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                                        {page.name}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            <header className="relative shadow-lg">
                <p className="flex h-10 items-center justify-center bg-indigo-700 text-sm font-medium tracking-wide">
                    Miễn phí vận chuyển cho mọi đơn hàng trên 10 triệu!
                </p>

                <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <button
                            type="button"
                            className="rounded-md p-2 text-gray-400 lg:hidden"
                        >
                            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                        </button>

                        <Link href="/" className="flex items-center">
                            <img
                                src="https://tailwindui.com/plus/img/logos/mark.svg?color=white&shade=600"
                                alt="Logo"
                                className="h-10 w-auto"
                            />
                            <span className="ml-2 text-2xl font-bold tracking-wide">Vũ Store</span>
                        </Link>

                        <PopoverGroup className="hidden lg:flex lg:space-x-10">
                            {navigation.pages.map((page) => (
                                <Popover key={page.name} className="relative">
                                    <Link href="/gioithieu" passHref
                                        className="text-sm font-medium hover:text-indigo-300 transition mr-4"
                                    >
                                        Giới thiệu
                                    </Link>
                                    <button
                                        className="text-sm font-medium hover:text-indigo-300 transition"
                                        onClick={() => setIsOpen2((prev) => !prev)}
                                    >
                                        {page.name}
                                    </button>

                                    {page.name === 'Sản phẩm' && isOpen2 && (
                                        <Popover.Panel
                                            static
                                            className="absolute z-30 mt-2 w-[500px] bg-white text-gray-800 rounded-lg shadow-xl ring-1 ring-black ring-opacity-5"
                                        >
                                            <div className="flex p-4 space-x-4">
                                                <img
                                                    src={page.icon}
                                                    alt={page.name}
                                                    className="w-[250px] h-[250px] rounded-lg border border-gray-200"
                                                />

                                                <ul className={`py-2 text-sm ${manufacturers?.length > 5 ? 'grid grid-cols-2 gap-2' : 'flex flex-col'}`}>
                                                    {manufacturers ? (
                                                        manufacturers.map((manufacturer:any) => (
                                                            <li key={manufacturer.id}>
                                                                <Link
                                                                    href={`/products/${manufacturer.id}`}
                                                                    className="block text-center px-6 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white rounded-md transition-colors duration-300"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        setIsOpen2(false);
                                                                        router.push(`/products/${manufacturer.id}`);
                                                                    }}
                                                                >
                                                                    {manufacturer.ten}
                                                                </Link>
                                                            </li>
                                                        ))
                                                    ) : (
                                                        <li className="px-4 py-2 text-gray-500">Đang tải...</li>
                                                    )}
                                                </ul>
                                            </div>
                                        </Popover.Panel>
                                    )}
                                </Popover>
                            ))}
                        </PopoverGroup>

                        <div className="flex items-center space-x-6">
                            <div className="relative rounded-full bg-white text-gray-700 shadow-md">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm laptop..."
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && keyword.trim() !== "") {
                                            e.preventDefault();
                                            router.push(`/timkiem`);
                                        }
                                    }}
                                    className="w-32 sm:w-48 px-4 py-1.5 text-sm rounded-full focus:outline-none animate-typing-placeholder"
                                />
                                <Link
                                    href={keyword.trim() !== "" ? `/timkiem` : "#"}
                                    className="absolute inset-y-0 right-0 flex items-center justify-center px-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
                                >
                                    <MagnifyingGlassIcon className="h-5 w-5" />
                                </Link>
                            </div>
                            <Link href="/favorites"
                                type="button"
                                className="relative p-2 hover:text-red-500 transition"
                                aria-label="Favorites"
                            >
                                <div className="relative">

                                    <HeartIcon className="h-6 w-6" />

                                    <span className="absolute top-[-5px] right-[0px] -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                        {favoritesCount}
                                    </span>

                                </div>
                            </Link>

                            <Link href="/cart"
                                className="relative p-2 hover:text-gray-300 transition">
                                <div className="relative">



                                    <ShoppingBagIcon className="h-6 w-6" />
                                    <span className="absolute top-[-5px] right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-xs text-white">
                                        {count}
                                    </span>
                                </div>
                            </Link>

                            <Popover className="relative">
                                <Popover.Button
                                    className="p-2 hover:text-gray-300 transition"
                                    onClick={() => setIsOpen((prev) => !prev)}
                                >
                                    <UserIcon className="h-6 w-6" />
                                </Popover.Button>

                                {isOpen && (
                                    <Popover.Panel
                                        static
                                        className="absolute right-0 mt-2 w-36 p-2 bg-white text-gray-800 rounded-lg z-10 shadow-lg ring-1 ring-black ring-opacity-5"
                                    >
                                        <ul className="py-2 text-sm">
                                            {authenticated ? (
                                                <>
                                                    <li>
                                                        <Link
                                                            href="/profile"
                                                            onClick={() => setIsOpen(false)}
                                                            className="block text-center px-6 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white rounded-md transition-colors duration-300"
                                                        >
                                                            Thông tin
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#"
                                                            onClick={() => {
                                                                logout();
                                                                setIsOpen(false);
                                                            }}
                                                            className="block text-center px-6 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white rounded-md transition-colors duration-300"
                                                        >
                                                            Đăng xuất
                                                        </Link>
                                                    </li>
                                                </>
                                            ) : (
                                                <>
                                                    <li>
                                                        <Link
                                                            href="/login"
                                                            onClick={() => setIsOpen(false)}
                                                            className="block text-center px-6 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white rounded-md transition-colors duration-300"
                                                        >
                                                            Đăng nhập
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href="/register"
                                                            onClick={() => setIsOpen(false)}
                                                            className="block text-center px-6 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white rounded-md transition-colors duration-300"
                                                        >
                                                            Đăng ký
                                                        </Link>
                                                    </li>
                                                </>
                                            )}
                                        </ul>
                                    </Popover.Panel>
                                )}
                            </Popover>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
}
