'use client';
import { Listbox, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { CustomFilterProps } from '@/types';
import Image from 'next/image';
import { flows } from '@/constants';
import ProcessData from './ProcessData';


const Process = ({ options = flows }: CustomFilterProps) => {


    const [selected, setSelected] = useState(options[0]);
    const [processFlow, setprocessFlow] = useState(options[0].value); // Initialized with the first option

    const handleUpdateParams = (e: { value: string[]; }) => {
        setprocessFlow(e.value);
        console.log(processFlow);
        const dataTable = {
            processFlow: processFlow,
        };

        // Send a POST request to the backend API
        fetch('http://localhost:3000/api/process', {
            method: 'POST',
            body: JSON.stringify(dataTable),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

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
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{option.title}</span>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </Listbox>
            </div>
            <ProcessData/>
        </div>
    );
};

export default Process;