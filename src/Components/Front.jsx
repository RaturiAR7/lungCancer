import React from "react";
import LungImg from "../assets/Lungs.jpeg";

const Front = () => {
  return (
    <div className=' bg-black  flex-col flex md:flex-row  justify-between items-center h-full md:h-screen py-5 '>
      <div className='px-2 md:px-20 flex flex-col justify-evenly'>
        <h1 className='text-cyan-500 text-5xl m-3 font-extrabold text-center'>
          Lung Cancer Detection
        </h1>
        <p className='text-white text-xl text-center'>
          Welcome to our Advanced Lung Cancer Detection Platform, driven by
          state-of-the-art machine learning technology. Experience unparalleled
          precision in early detection and personalized diagnostics for a
          proactive approach to your lung health.
        </p>
      </div>
      <img src={LungImg} className='max-w-1/2 h-full pr-5' />
    </div>
  );
};
export default Front;
