import Link from "next/link";

interface Step1Props {
    cartItems: any[];
    handleUpdateQuantity: (itemId: any, newQuantity: any) => void;
    handleRemoveItem: (itemId: any) => void;
    handleClearCart: () => void;
    totalPrice: number;
    shippingCost: number;
    handleNextStep: () => void;
}

export default function Step1({
    cartItems,
    handleUpdateQuantity,
    handleRemoveItem,
    handleClearCart,
    totalPrice,
    shippingCost,
    handleNextStep,
}: Step1Props) {
    return (
        <>
            {cartItems.length === 0 ? (
                <div className="text-center">
                    <p className="text-xl font-medium text-gray-500">
                        Giỏ hàng của bạn hiện đang trống!
                    </p>
                    <Link href="/products">
                        <button className="mt-6 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-green-500 hover:to-blue-600 transition-transform duration-300 transform hover:-translate-y-1">
                            Tiếp tục mua sắm
                        </button>
                    </Link>
                </div>
            ) : (
                <div className="space-y-8">
                    <div className="flex justify-between items-center">
                            <h2 className="text-lg sm:text-3xl py-8 font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 animate-pulse text-center">Giỏ hàng của bạn</h2>
                        <button
                            onClick={handleClearCart}
                            className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:from-red-600 hover:to-pink-700 transition-transform duration-300 transform hover:-translate-y-1"
                        >
                            Xóa tất cả
                        </button>
                    </div>

                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow"
                            >
                                <div className="flex items-center space-x-6">
                                    <Link href={`/productdetail/${item.id}`}>
                                        <img
                                            src={item.hinh}
                                            alt={item.ten}
                                            className="w-40 object-cover rounded-lg border border-gray-200 hover:scale-105 transition-transform"
                                        />
                                    </Link>
                                    <div className="space-y-2">
                                        <Link href={`/productdetail/${item.id}`}>
                                            <p className="text-lg font-bold hover:text-purple-600 transition">
                                                {item.ten}
                                            </p>
                                        </Link>
                                        <p className="text-sm text-gray-400 line-through">
                                            {item.gia?.toLocaleString("vi-VN")} VND
                                        </p>
                                        <p className="text-lg font-bold text-rose-600">
                                            {item.gia_km?.toLocaleString("vi-VN")} VND
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-3">
                                        <button
                                            onClick={() =>
                                                handleUpdateQuantity(item.id, item.quantity - 1)
                                            }
                                            className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-rose-400 to-red-500 text-white font-bold text-lg rounded-full shadow-md hover:shadow-lg hover:from-rose-500 hover:to-red-600 transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>

                                        <div className="flex items-center justify-center w-12 h-8 bg-gray-100 text-lg font-semibold text-gray-800 rounded-md shadow-inner">
                                            {item.quantity}
                                        </div>

                                        <button
                                            onClick={() =>
                                                handleUpdateQuantity(item.id, item.quantity + 1)
                                            }
                                            className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-purple-400 to-blue-500 text-white font-bold text-lg rounded-full shadow-md hover:shadow-lg hover:from-purple-500 hover:to-blue-600 transition-transform active:scale-95"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <p className="text-lg w-[150px] font-semibold text-rose-600">
                                        {(item.gia_km * item.quantity).toLocaleString("vi-VN")} VND
                                    </p>
                                    <button
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="text-red-500 hover:text-red-600"
                                    >
                                        ✖
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            Chi tiết tổng tiền hàng:
                        </h2>
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between items-center text-gray-700"
                                >
                                    <p className="font-medium">
                                        {item.ten} x {item.quantity}
                                    </p>
                                    <p className="font-bold ">
                                        {(item.gia_km * item.quantity).toLocaleString("vi-VN")} VND
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between items-center mt-6 border-t pt-4">
                            <p className="font-medium text-gray-600">Phí giao hàng:</p>
                            <p className="font-medium text-gray-800">
                                {shippingCost === 0
                                    ? "Miễn phí"
                                    : `${shippingCost.toLocaleString("vi-VN")} VND`}
                            </p>
                        </div>

                        <div className="flex justify-between items-center mt-4 border-t pt-4">
                            <p className="text-xl font-semibold">Tổng cộng:</p>
                            <p className="text-xl font-bold text-purple-600">
                                {(totalPrice + shippingCost).toLocaleString("vi-VN")} VND
                            </p>
                        </div>

                        <div className="flex justify-center mt-6">
                            <button
                                onClick={handleNextStep}
                                className="p-3 bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg hover:from-green-600 hover:to-teal-700 transition-transform duration-300 transform hover:-translate-y-1"
                            >
                                Tiếp tục thanh toán
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
