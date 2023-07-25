import React from "react";
import { motion } from 'framer-motion';


const Gallery = () => {

    return (
        <>
            <ul className="grid grid-cols-3  gap-4 w-130  mx-auto text-center">

            <li className="rounded-lg w-1/2 drop-shadow-lg overflow-hidden hover:scale-105 duration-300 ease-out mx-auto bg-bgColor">

            <img src="/homeIcon.svg" className="mx-auto  dark:-hue-rotate-[130deg] -hue-rotate-[330deg] drop-shadow-md brightness-[150%] dark:brightness-[400%] stroke-1 " alt="iso" />
            
            <p className="font-mono">Icons/Logos</p>
            </li>
            
            <li className="rounded-lg w-1/2 drop-shadow-lg overflow-hidden hover:scale-105 duration-300 ease-out mx-auto bg-bgColor">

            <img src="/homeIcon.svg" className="mx-auto  dark:-hue-rotate-[130deg] -hue-rotate-[330deg] drop-shadow-md brightness-[150%] dark:brightness-[400%] stroke-1 " alt="iso" />
            
            <p className="font-mono">Motion Graphics</p>
            </li>
            
            <li className="rounded-lg w-1/2 drop-shadow-lg  overflow-hidden hover:scale-105 duration-300 ease-out mx-auto bg-bgColor">

            <img src="/homeIcon.svg" className="mx-auto grayscale dark:-hue-rotate-0 -hue-rotate-60 drop-shadow-md brightness-[150%] dark:brightness-[400%] stroke-1 " alt="iso" />
            
            <p className="font-mono">Web Design</p>
            </li>
            
            
          

            </ul>
        </>
    );
};

export default Gallery;