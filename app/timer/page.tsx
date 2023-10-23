'use client'
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const Timer: React.FC = () => {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  let intervalId: NodeJS.Timeout | null = null;

  useEffect(() => {
    if (running) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      if (intervalId) {
        clearInterval(intervalId);
      }
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [running]);

  const handleStartStopClick = () => {
    setRunning((prevRunning) => !prevRunning);
  };
const handleResetAllClick = () => {
  setSeconds(0);
    setRunning(false); // Stop the timer
    setTotalTime(0); // Add the current timer value to total time

}
  const handleResetClick = () => {
    setTotalTime(totalTime + seconds); // Add the current timer value to total time
    setSeconds(0);
    setRunning(false); // Stop the timer

    const roomTable = {
      roomType: 'Room 1',
      totalTime: totalTime
    }
console.log(totalTime)
    fetch('http://localhost:3000/api/room', {
      method: 'POST',
      body: JSON.stringify(roomTable),
      headers: {
        'Content-Type': 'application/json',
      },
    })
     };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className='text-4xl font-bold my-20'>Patient Checkup</h1>
      <div className="bg-gray-200 p-4 rounded-lg ">
        <h1 className="ml-8 text-lg font-bold mb-4">Timer: {seconds} seconds</h1>
        <button
          className={`px-4 py-2 rounded-md ${running ? 'bg-red-500' : 'bg-green-500'
            } text-white font-semibold hover:bg-opacity-80 transition-all`}
          onClick={handleStartStopClick}
        >
          {running ? 'Stop' : 'Start'}
        </button>
        <button
          className="ml-20 px-4 py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-opacity-80 transition-all"
          onClick={handleResetClick}
        >
          Count
        </button>
        <button
          className="ml-20 px-4 py-2 bg-red-500 text-white rounded-md font-semibold hover:bg-opacity-80 transition-all"
          onClick={handleResetAllClick}
        >
          Reset
        </button>
        <p className="mt-4 text-xl font-bold ">
          {totalTime > 0 ? `Time Spent: ${totalTime} seconds` : ''}
        </p>
      </div>
      <div className='mt-14'>
        <Link
          href={'/process'}
          className="border-[3px] hover:border-blue-900 border-blue-700 hover:bg-blue-600 bg-blue-500 text-white rounded-lg py-2 px-2">Go Back</Link>
      </div>
    </div>
  );
};

export default Timer;
