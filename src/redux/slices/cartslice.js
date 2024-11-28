import { createSlice } from '@reduxjs/toolkit';
let initialCartState = { items: [] };

if (typeof window !== "undefined") {
    try {
        const storedCart = JSON.parse(localStorage.getItem('cart') || '{}');
        initialCartState.items =storedCart.items|| [];
    } catch {
        console.error("lỗi localStorage");
    }
}



const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState, 
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state?.items.find((item) => item.id === action.payload.item.id);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push({ ...action.payload.item, quantity: action.payload.quantity });
            }

            if (typeof window !== "undefined") {
                localStorage.setItem('cart', JSON.stringify(state));
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload.id);

            if (typeof window !== "undefined") {
                localStorage.setItem('cart', JSON.stringify(state));
            }
        },
        updateQuantity: (state, action) => {
            const item = state.items.find((item) => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
            }

            if (typeof window !== "undefined") {
                localStorage.setItem('cart', JSON.stringify(state));
            }
        },
        clearCart: (state) => {
            state.items = [];
            if (typeof window !== "undefined") {
                localStorage.removeItem('cart');
            }
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
