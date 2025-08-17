"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Clock, ExternalLink, Link, Star, Ticket, Timer, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Placeholder from '@/src/Placeholder.jpg';
import { Hotel } from './ChatBox';
import axios from 'axios';
type Props={
    hotels:Hotel
}
function HotelCardItem({hotels}:Props) {
  const [photoUrl,setPhotoUrl]=useState<string>();

  useEffect(()=>{
    hotels&&GetGooglePlaceDetail();
  },[hotels])
  const GetGooglePlaceDetail=async()=>{
    const result=await axios.post('/api/google-place-detail',{
      placeName:hotels?.hotel_name,
      placeAddress:hotels?.hotel_address
    });
    if(result?.data?.e){
      return;
    }
    setPhotoUrl(result?.data);
  }

  return (
    <div className='flex flex-col gap-1'>
              <Image src={photoUrl?photoUrl:Placeholder} alt='place-img' width={400} height={200}
              className='rounded-xl shadow object-cover mb-2'/>
              <h2 className='font-semibold text-lg'>{hotels?.hotel_name}</h2>
              <h2 className='text-gray-500 line-clamp-2'>{hotels?.hotel_address}</h2>
              <div className='flex justify-between items-center'>
              <p className='flex gap-2 text-green-300'><Wallet></Wallet>{hotels?.price_per_night}</p>
              <p className='flex gap-2 text-yellow-400'><Star/>{hotels?.rating}</p>
              </div>
              <a href={'https://www.google.com/maps/search/?api=1&query='+hotels?.hotel_name} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    View <ExternalLink />
                  </Button>
             </a>
            </div>
  )
}

export default HotelCardItem