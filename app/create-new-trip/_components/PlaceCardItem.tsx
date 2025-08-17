"use client"
import React from 'react'
import Image from 'next/image';
import { Clock, ExternalLink, Link, Star, Ticket, Timer, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Placeholder from '@/src/Placeholder.jpg';
import { Activity } from './ChatBox';
import { useState,useEffect } from 'react';
import axios from 'axios';
type Props={
    activity:Activity
}
function PlaceCardItem({activity}:Props) {
  const [photoUrl,setPhotoUrl]=useState<string>();
  
    useEffect(()=>{
      activity&&GetGooglePlaceDetail();
    },[activity])
    const GetGooglePlaceDetail=async()=>{
      const result=await axios.post('/api/google-place-detail',{
        placeName:activity?.place_name,
        placeAddress:activity?.place_address
      });
      if(result?.data?.e){
        return;
      }
      setPhotoUrl(result?.data);
    }
  return (
    <div >
        <Image src={photoUrl?photoUrl:Placeholder}width={450} height={200} alt={activity.place_name} className='object-cover rounded-xl' />
        <h2 className='font-semibold text-lg'>{activity?.place_name}</h2>
        <p className='text-gray-500 line-clamp-1'>{activity?.place_details}</p>
        <div className='flex gap-1'>
        <h2 className='flex  gap-1 text-blue-500 line-clamp-1'><Ticket/>{activity?.ticket_pricing}</h2>
        <p className='flex  text-purple-300  line-clamp-1'><Clock/>{activity?.time_travel_each_location}</p>
        <p className='flex '><Timer/>{activity?.best_time_to_visit}</p>
        </div>
        <a href={'https://www.google.com/maps/search/?api=1&query='+activity?.place_name} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="w-full mt-2">View <ExternalLink />
            </Button>
        </a>
    </div>
  )
}

export default PlaceCardItem