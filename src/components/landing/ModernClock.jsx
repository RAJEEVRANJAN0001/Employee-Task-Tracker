import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ModernClock = ({ onClick }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const dates = Array.from({ length: 31 }, (_, i) => i + 1);

    const currentDayIndex = time.getDay();
    const currentMonthIndex = time.getMonth();
    const currentDate = time.getDate();
    const currentDateIndex = currentDate - 1;

    const dayStep = 360 / 7;
    const monthStep = 360 / 12;
    const dateStep = 360 / 31;

    // Rotate rings so current item is at top (0 degrees, assuming 12 o'clock is 0)
    const dayRingRotation = - (currentDayIndex * dayStep);
    const monthRingRotation = - (currentMonthIndex * monthStep);
    const dateRingRotation = - (currentDateIndex * dateStep);

    // Hands
    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours = time.getHours();

    const secondDegrees = (seconds / 60) * 360;
    const minuteDegrees = ((minutes + seconds / 60) / 60) * 360;
    const hourDegrees = ((hours + minutes / 60) / 12) * 360;

    return (
        <div className="relative w-80 h-80 cursor-pointer group scale-75 sm:scale-100 transition-transform duration-300" onClick={onClick}>
            {/* Background / Container */}
            <div className="absolute inset-0 rounded-full bg-[#1a1a1a] border-[8px] border-[#2a2a2a] shadow-2xl flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:shadow-[0_0_50px_rgba(0,0,0,0.5)] group-hover:scale-[1.02]">

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/40 pointer-events-none z-20" />

                {/* Date Ring (Outer) */}
                <motion.div
                    className="absolute w-full h-full"
                    animate={{ rotate: dateRingRotation }}
                    transition={{ type: "spring", stiffness: 40, damping: 15 }}
                >
                    {dates.map((date, i) => (
                        <div
                            key={date}
                            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold transition-colors duration-300 ${i === currentDateIndex ? 'text-red-500 text-sm scale-110' : 'text-gray-600 text-[10px]'}`}
                            style={{
                                transform: `rotate(${i * dateStep}deg) translate(0, -135px) rotate(${-i * dateStep}deg)`
                            }}
                        >
                            {date}
                        </div>
                    ))}
                </motion.div>

                {/* Separator Ring 1 */}
                <div className="absolute w-[72%] h-[72%] rounded-full border border-gray-800/50" />

                {/* Month Ring (Middle) */}
                <motion.div
                    className="absolute w-[70%] h-[70%]"
                    animate={{ rotate: monthRingRotation }}
                    transition={{ type: "spring", stiffness: 40, damping: 15 }}
                >
                    {months.map((month, i) => (
                        <div
                            key={month}
                            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold transition-colors duration-300 ${i === currentMonthIndex ? 'text-blue-500 text-xs scale-110' : 'text-gray-600 text-[9px]'}`}
                            style={{
                                transform: `rotate(${i * monthStep}deg) translate(0, -95px) rotate(${-i * monthStep}deg)`
                            }}
                        >
                            {month}
                        </div>
                    ))}
                </motion.div>

                {/* Separator Ring 2 */}
                <div className="absolute w-[48%] h-[48%] rounded-full border border-gray-800/50" />

                {/* Day Ring (Inner) */}
                <motion.div
                    className="absolute w-[46%] h-[46%]"
                    animate={{ rotate: dayRingRotation }}
                    transition={{ type: "spring", stiffness: 40, damping: 15 }}
                >
                    {days.map((day, i) => (
                        <div
                            key={day}
                            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold transition-colors duration-300 ${i === currentDayIndex ? 'text-green-500 text-[10px] scale-110' : 'text-gray-600 text-[8px]'}`}
                            style={{
                                transform: `rotate(${i * dayStep}deg) translate(0, -60px) rotate(${-i * dayStep}deg)`
                            }}
                        >
                            {day}
                        </div>
                    ))}
                </motion.div>

                {/* Center / Hands Container */}
                <div className="absolute w-28 h-28 rounded-full bg-[#222] border-[4px] border-[#333] flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] z-10">

                    {/* Hour Hand */}
                    <div
                        className="absolute w-1.5 h-8 bg-white rounded-full origin-bottom bottom-1/2 shadow-md"
                        style={{ transform: `rotate(${hourDegrees}deg)` }}
                    />

                    {/* Minute Hand */}
                    <div
                        className="absolute w-1 h-10 bg-gray-300 rounded-full origin-bottom bottom-1/2 shadow-md"
                        style={{ transform: `rotate(${minuteDegrees}deg)` }}
                    />

                    {/* Second Hand */}
                    <div
                        className="absolute w-0.5 h-11 bg-red-500 rounded-full origin-bottom bottom-1/2 shadow-sm"
                        style={{ transform: `rotate(${secondDegrees}deg)` }}
                    />

                    {/* Center Dot */}
                    <div className="absolute w-3 h-3 bg-white rounded-full z-20 shadow-md border-2 border-gray-300" />
                </div>

                {/* Click Hint Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 z-30 rounded-full">
                    <span className="text-white font-bold tracking-widest text-sm bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
                        ENTER
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ModernClock;
