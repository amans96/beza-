import React,{useState,useEffect} from 'react';
import {Clubs} from '../data/clubs.js';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
export default function Club() {
    const [currentImage,setCurrentImage] = useState({});
  const nextImage = (id, length) => {
  setCurrentImage((prev) => ({
    ...prev,
    [id]: ((prev[id] ?? 0) + 1) % length,
  }));
};
    const previousImage = (id, length) => {
  setCurrentImage((prev) => ({
    ...prev,
    [id]: ((prev[id] ?? 0) - 1 + length) % length,
  }));
};
     return(
        <div className=" grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 justify-items-center p-6 gap-10 ">
            {Clubs.map((club) => {
                return (
                    <div key={club.id} className=" relative w-80 h-[430px] bg-white rounded-2xl overflow-hidden  shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                        <img src={club.photo[currentImage[club.id] ?? 0]} alt="Club" className="w-full h-52 object-cover " />
                        <button onClick={() => previousImage(club.id, club.photo.length)} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg">
                            <FaChevronLeft />
                        </button>
                        <button onClick={() => nextImage(club.id, club.photo.length)} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg">
                            <FaChevronRight />
                        </button>
                       <div className="p-5">
    <p className="text-gray-600 text-sm leading-6">
        {club.disc}
    </p>
</div>
                    </div>
                )
            })}
        </div>
     )
    


}