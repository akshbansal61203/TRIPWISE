import React from "react";
import Lottie from "lottie-react";
import travel from "@/src/travel.json"
import { suggestions } from "@/app/_components/Hero";
function EmptyBoxState({onSelectOption}:any) {

  return (
    <div className="flex flex-col items-center justify-center ">
      <Lottie
        animationData={travel}
        loop={true}
        style={{ width: 210, height: 210 }}
      />
      <p className="text-gray-500 mt-4 text-lg pb-4">
        No trips yet. Create your first trip!
      </p>
      <div className='flex flex-col justify-end items-start gap-5'>
                      {suggestions.map((suggestions,index)=>(
                          <div key={index} 
                          onClick={()=>onSelectOption(suggestions.title)}
                          className='flex items-start gap-2 border rounded-xl p-2 cursor-pointer hover:bg-purple-500 hover:text-white'>

                              {suggestions.icon}
                              <h2 className='text-sm '>{suggestions.title}</h2>
                          </div>
                      ))}
        </div>
    </div>
  );
}

export default EmptyBoxState;

