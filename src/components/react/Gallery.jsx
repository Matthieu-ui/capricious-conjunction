import React from "react";



const Gallery = () => {

    return (
        <>
            <div className="grid grid-cols-3 gap-4  mx-auto   ">

                <div className="rounded-lg drop-shadow-lg  p-5 overflow-hidden hover:scale-105 duration-300 ease-out mx-auto bg-bgColor">

                    <div className="p-4 ">
                        <img src="/icon.png" className="mx-auto" alt="iso" />
                       
                    </div>
                    <p className="font-mono">Motion Graphics</p>
                </div>

                <div className="rounded-lg drop-shadow-lg p-5 overflow-hidden hover:scale-105 duration-300 ease-out mx-auto bg-bgColor">
                <img src="/homeIcon.svg" className="mx-auto grayscale dark:-hue-rotate-0 -hue-rotate-60 drop-shadow-md brightness-[150%] dark:brightness-[400%] stroke-1 stroke-black" alt="iso" />
                <div className="p-4 ">
                
           
            </div>
            <p className="font-mono">Icons/Library</p>
            </div>
            <div className="rounded-lg drop-shadow-lg p-5 overflow-hidden hover:scale-105 duration-300 ease-out mx-auto bg-bgColor">

            <div className="p-4 ">
          <img src="https://api.iconify.design/iconoir:www.svg" className="mx-auto w-[70px] drop-shadow-lg dark:invert" alt="iso" />
     
        </div>
        <p className="font-mono">More Samples</p>
        </div>
            </div>



        </>

    );
};

export default Gallery;