import React from "react";
import { Icon } from 'astro-icon';



const Gallery = () => {

    return (
        <>
            <ul className="grid grid-cols-3  gap-4 w-130  mx-auto text-center">

            <li className="mx-auto rounded-lg w-full drop-shadow-lg overflow-hidden duration-300 group relative border border-accent  bg-zinc-200 p-2 ring-accent transition-all hover:ring-2 dark:bg-zinc-900">

            <img src="/homeIcon.svg" className="mx-auto dark:-hue-rotate-[130deg] -hue-rotate-[330deg] drop-shadow-md brightness-[150%] dark:brightness-[400%] stroke-1 " alt="iso" />
            
            <p className="font-mono">Icons/Logos</p>
            </li>
            
            <li className="mx-auto rounded-lg w-full drop-shadow-lg overflow-hidden duration-300 group relative border border-accent  bg-zinc-200 p-2 ring-accent transition-all hover:ring-2 dark:bg-zinc-900">

            <img src="/homeIcon.svg" className="mx-auto  dark:-hue-rotate-[130deg] -hue-rotate-[330deg] drop-shadow-md brightness-[150%] dark:brightness-[400%] stroke-1 " alt="iso" />
            
            <p className="font-mono">Motion Graphics</p>
            </li>
            

            <li className="mx-auto rounded-lg w-full drop-shadow-lg overflow-hidden duration-300 group relative border border-accent  bg-zinc-200 p-2 ring-accent transition-all hover:ring-2 dark:bg-zinc-900">
            
            <img src="/homeIcon.svg" className="mx-auto grayscale dark:-hue-rotate-0 -hue-rotate-60 drop-shadow-md brightness-[150%] dark:brightness-[400%] stroke-1 " alt="iso" />
            
            <p className="font-mono">Web Design</p>
            </li>
            
            
          

            </ul>
        </>
    );
};

export default Gallery;