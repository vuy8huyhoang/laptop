'use client';
import React, { useState, useEffect } from 'react';

export default function DataFetcher() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((responseData) => setData(responseData));
    }, []);

    return (
        <div>
            {data.map((item:any) => (
                <li key={item.id}>{item.name}</li>
            ))}
        </div>
    );
}
