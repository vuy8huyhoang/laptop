"use client";
import { useState } from "react";

export default function VD() {
    const [name, setName] = useState("");

    const handleClick = () => {
        alert(`Hello ${name}`);
    };

    return (
        <div>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-400 p-2"
            />
            <button
                onClick={handleClick}
                className="bg-blue-500 text-white px-4 py-2 rounded-full"
            >
                Click me
            </button>
        </div>
    );
}
