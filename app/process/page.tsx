'use client';
import { Listbox, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { CustomFilterProps } from '@/types';
import Image from 'next/image';
import { flows } from '@/constants';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Process = ({ options = flows }: CustomFilterProps) => {

    const [selected, setSelected] = useState(options[0]);
    const [currFlow, setCurrFlow] = useState([]); // Initialized with the first option
    const [currFlowId, setCurrFlowId] = useState(''); // Initialized with the first option
    const handleUpdateParams = (e: { value: string[]; }) => {
        const dataTable = {
            processFlow: e.value,
        };

        // Send a POST request to the backend API
        fetch('http://localhost:3000/api/process', {
            method: 'POST',
            body: JSON.stringify(dataTable),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                // Access the currFlow from the response data
                const currentFlow = data.currentFlow;
                const currentFlowId = data.currentFlowId._id

                const splitArray = currentFlow.map((item: string) => item.split(','));
                setCurrFlow(splitArray)
                setCurrFlowId(currentFlowId)
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }

    useEffect(() => {
        const tokenTable = {
            processFlowId: currFlowId,
        };
        // Send a PUT request to the backend API
        fetch('http://localhost:3000/api/process', {
            method: 'PUT',
            body: JSON.stringify(tokenTable),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    },
        [currFlowId]
    )

    const router = useRouter()
    const handleButtonClick = async () => {
        // const res = await fetch("/api/counter", {
        //     method: "DELETE",
        // });
        setTimeout(() => {
            router.push('/timer');
        }, 1000);
    };

    // Frontend Filter
    return (
        <div className='flex flex-col justify-center items-center mt-10'>
            <h1 className='text-xl font-bold'>Select Process Flow</h1>
            <div className="my-10 pb-10">
                <Listbox
                    value={selected}
                    onChange={(e) => {
                        setSelected(e);
                        handleUpdateParams(e);
                    }}>
                    <div className="relative w-fit z-10">
                        <Listbox.Button className={'relative w-full min-w-[127px] flex justify-between items-center cursor-default rounded-lg bg-white py-2 px-3 text-left shadow-md sm:text-sm border;'}>
                            <span className="block truncate">{selected.title}</span>
                            <Image src={'/chevron-up-down.svg'}
                                width={20}
                                height={20}
                                className="ml-4 object-contain"
                                alt="chevron" />
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0">
                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md  py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm;">
                                {flows.map((option) => (
                                    <Listbox.Option
                                        key={option.title}
                                        value={option}
                                        className={({ active }) => `relative cursor-default select-none py-2 px-4 ${active ? 'bg-blue-500 text-white' : 'text-gray-900'}`}>
                                        {({ selected }) => (
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                {option.title}
                                            </span>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </Listbox>
            </div>
            <div className="my-10">
                <div className="flex mb-10 justify-center items-center flex-col">
                    <h2 className="font-bold py-3">Process Flow Assigned:</h2>
                    <ul>
                        {
                            currFlow.map((item: any, i) => (
                                <div key={i} className='flex justify-center  items-center gap-5 py-1 '>
                                    {item?.map((text: any, subIndex: number) => (
                                        <li key={subIndex} >{text}</li>
                                    ))}
                                    <Link href={'/timer'} className='text-blue-500 font-medium'>
                                        Enter in Room
                                    </Link>
                                </div>
                            ))
                        }
                    </ul>
                </div>
                <div>
                    <div className='flex justify-center items-center'>
                        <button
                            onClick={handleButtonClick}
                            className="border-[3px] hover:border-blue-900 border-blue-700 hover:bg-blue-600 bg-blue-500 text-white rounded-lg py-2 px-2">
                            Proceed Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Process;