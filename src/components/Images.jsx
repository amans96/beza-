import React,{useState,useEffect} from "react";
import img1 from '../assets/image1.jpg'
import img2 from '../assets/image2.jpg'
import img3 from '../assets/image3.jpg'
import img4 from '../assets/image4.jpg'
import img5 from '../assets/image5.jpg'
import img6 from '../assets/image6.jpg'
import img7 from '../assets/image7.jpg'
import img9 from '../assets/image9.jpg'
export default function Images(){
   const Photo = [
  {
    id: "photo1",
    real: img1,
    disc: "Graduation ceremony 2001 batch",
  },
  {
    id: "photo2",
    real: img2,
    disc: "Students celebrating after exams",
  },
  {
    id: "photo3",
    real: img3,
    disc: "Class group photo on campus",
  },
  {
    id: "photo4",
    real: img4,
    disc: "Award distribution moment",
  },
  {
    id: "photo5",
    real: img5,
    disc: "Friends during graduation day",
  },
  {
    id: "photo6",
    real: img6,
    disc: "Teachers and students together",
  },
  {
    id: "photo7",
    real: img7,
    disc: "Campus celebration event",
  },
  {
    id: "photo9",
    real: img9,
    disc: "Final farewell group photo",
  },
];
    return(
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
  {Photo.map((item) => (
    <div
      key={item.id}
      id={item.id}
      className="relative group overflow-hidden rounded-xl shadow-lg"
    >
      {/* Image */}
      <img
        src={item.real}
        alt={item.disc}
        className="w-full h-72 object-cover transform transition duration-300 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition duration-300 flex items-center justify-center">
        <p className="text-white text-center px-4 opacity-0 group-hover:opacity-100 transition duration-300 text-lg font-medium">
          {item.disc}
        </p>
      </div>
    </div>
  ))}
</div>
    )

}