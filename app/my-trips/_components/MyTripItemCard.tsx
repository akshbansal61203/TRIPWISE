import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Placeholder from '@/src/Placeholder.jpg'
import { Trip } from '../page'
import { ArrowBigRightIcon } from 'lucide-react'
import axios from 'axios'
type Props={
    trip:Trip
}
function MyTripItemCard({trip}:Props) {
    const [photoUrl,setPhotoUrl]=useState<string>();
  
    useEffect(()=>{
      trip&&GetGooglePlaceDetail();
    },[trip])
    const GetGooglePlaceDetail=async()=>{
      const result=await axios.post('/api/google-place-detail',{
        placeName:trip?.tripDetail.destination,
        placeAddress:trip?.tripDetail?.itinerary[0]?.activities[0].place_address
      });
      if(result?.data?.e){
        return;
      }
      setPhotoUrl(result?.data);
    }
  return (
    <a href={'/view-trips/'+trip?.tripId} className='p-5 shadow rounded-2xl' >
        <Image src={photoUrl?photoUrl:Placeholder} alt={trip.tripId} width={400} height={400}
                className='rounded-xl object-cover w-full h-[270px]
                '/>
        <h2 className='flex gap-2 font-semibold text-xl mt-2'>{trip?.tripDetail?.origin}<ArrowBigRightIcon/> {trip?.tripDetail?.destination}</h2>
        <h2 className='mt-2 text-gray-500'>{trip?.tripDetail?.duration} Trip with {trip?.tripDetail?.budget} Budget</h2>
    </a>
  )
}

export default MyTripItemCard