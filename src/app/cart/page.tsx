"use client";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "@/redux/slices/cartslice.js"
import { useMemo, useState } from "react";
import Step1 from "../components/step1";

export default function Cart() {
    const dispatch = useDispatch();
    const [step, setStep] = useState(1);
    const cartItems= useSelector((state: any) => state.cart.items);
    const totalPrice = useMemo(() => {
        return cartItems.reduce((total: any, item: any) => total + item.gia_km * item.quantity, 0);
    }, [cartItems]);

    const shippingCost = useMemo(() => {
        return totalPrice >= 10000000 ? 0 : 30000;
    }, [totalPrice]);

    const handleRemoveItem = (itemId: any) => {
        if (itemId !== null) {
            dispatch(removeFromCart({ id: itemId }));

        }
    };
    const handleClearCart = () => {
        dispatch(clearCart());
    }
    const handleUpdateQuantity = (itemId: any, newQuantity: any) => {
        dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
    };
    const handleNextStep = () => {
        if (step < 3) setStep(step + 1);
    };
    const handlePreviousStep = () => {
        if (step > 1) setStep(step - 1);
    };
    return (

        <div className="mx-auto max-w-7xl px-6 py-8">

            {cartItems.length > 0 && (
                <div className="flex justify-center items-center space-x-4 mb-8">
                    {["Giỏ Hàng", "Thông Tin Giao Hàng", "Xác Nhận"].map((label, index) => (
                        <div
                            key={index}
                            className={`flex items-center space-x-2 ${step === index + 1 ? "text-purple-600 font-bold" : "text-gray-400"
                                }`}
                        >
                            <div
                                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${step === index + 1
                                    ? "border-purple-600 bg-purple-100"
                                    : "border-gray-300"
                                    }`}
                            >
                                {index + 1}
                            </div>
                            <span>{label}</span>
                        </div>
                    ))}
                </div>
            )}
            {step === 1 && cartItems.length === 0 && (
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
            )
            }
            {step === 1 && cartItems.length > 0 && (
                <Step1
                    cartItems={cartItems}
                    handleUpdateQuantity={handleUpdateQuantity}
                    handleRemoveItem={handleRemoveItem}
                    handleClearCart={handleClearCart}
                    totalPrice={totalPrice}
                    shippingCost={shippingCost}
                    handleNextStep={handleNextStep}
                />
            )}
            {step === 2 && cartItems.length > 0 && (
                <div>

                </div>
            )}
            {step === 3 && cartItems.length > 0 && (
                <div>

                </div>
            )}
        </div>
    );
}
