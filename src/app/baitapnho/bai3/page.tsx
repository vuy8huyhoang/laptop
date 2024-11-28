'use client';
import { useState } from 'react';
export default function Counter() {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    }
    const decrement = () => {
        setCount(count - 1);
    }
    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={increment} className='bg-blue-500 text-white px-4 py-2 rounded-full'> Tăng </button>
            <button onClick={decrement} className='bg-red-500 text-white px-4 py-2 rounded-full'> Giảm </button>
        </div>)
}