'use client'
import { ProcessDataItem } from '@/types';
import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react'


export const getData = async (): Promise<ProcessDataItem[]> => {
    try {
        // Send a GET request to the backend API
        const res = await fetch('http://localhost:3000/api/process', {
            method: 'GET',
            cache: "no-store",
            headers: { 'Content-Type': 'application/json' }
        });

        if (!res.ok) {
            throw new Error(`Error fetching data`)
        }
        const processFlowdata = await res.json();

        const data = processFlowdata.data;
        const lastData = data.slice(-1)  // Slicing to get last value in Array
        console.log(lastData)
        return lastData

    } catch (error) {
        console.log(error)
        return [];
    }
}


const ProcessData: FC = () => {
    const [data, setData] = useState<ProcessDataItem[]>([]);

    useEffect(() => {
        // Fetch data when the component mounts
        getData()
            .then((lastData) => {
                setData(lastData);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []); // The empty dependency array ensures this runs only once when the component mounts


    return (
        <div>
            <div className="mt-10">
                {data.map((item, index) => (
                    <div key={index} className="flex justify-center items-center flex-col">
                        <h2 className="font-bold py-3">Process Flow Assigned:</h2>
                        <ul>
                            {item.processFlow.map((process, i) => (
                                <div className='flex justify-center items-center gap-5 py-1 '><li key={i}>{++i + ". "}{process}</li>
                                    <Link href={'/timer'} className='text-blue-500 font-medium'>
                                        Enter in Room
                                    </Link>
                                </div>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default ProcessData
