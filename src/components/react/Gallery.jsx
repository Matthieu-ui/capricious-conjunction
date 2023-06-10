import React from "react";

const Gallery = () => {

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                <div className="rounded-lg shadow-lg overflow-hidden hover:scale-105 duration-300 ease-out">

                    <div className="p-4">
                        <img src="/src/assets/gallery/isoblokfurbnew.png" alt="iso" />
                        <p className="text-3xl font-semibold ">Logos</p>
                    </div>

                </div>

                <div className="rounded-lg shadow-lg overflow-hidden hover:scale-105  duration-300 ease-out">

                    <div className="p-4">
                        <img src="/src/assets/gallery/isoblokfurbnew.png" alt="iso" />
                        <p className="text-3xl font-semibold">Design</p>
                        <p className="text-xs font-semibold">System</p>
                    </div>

                </div>
                <div className="rounded-lg shadow-lg overflow-hidden hover:scale-105 duration-300 ease-out">

                    <div className="p-4">
                        <img src="/src/assets/gallery/isoblokfurbnew.png" alt="iso" />
                        <p className="text-3xl font-semibold ">Icons</p>
                    </div>



                </div>
            </div>



        </>

    );
};

export default Gallery;