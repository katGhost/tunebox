'use client'

import { useEffect, useState } from 'react';

export default function Home() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:8080/api/home'); // Adjust the endpoint based on your Flask app
            const result = await res.json();
            setData(result);
        };

        fetchData();
    }, []);

    if (!data) return <div>Loading...</div>;

    return (
        <div>
          <h1>{JSON.stringify(data)}</h1>
        </div>
    );
}
