"use client"
import { Button } from '@/components/ui/button';
import { useConvex } from 'convex/react';
import { ArrowBigRightIcon, Link } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { query } from '@/convex/_generated/server';
import { api } from '@/convex/_generated/api';
import { useUserDetail } from '../provider';
import { TripInfo } from '../create-new-trip/_components/ChatBox';
import Placeholder from '@/src/Placeholder.jpg';
import Image from 'next/image';
import MyTripItemCard from './_components/MyTripItemCard';
export type Trip={
    tripId:any,
    tripDetail:TripInfo,
    _id:string
}

function MyTrips() {

    const [myTrips,setMyTrips]=useState<Trip[]>([]);
    const {userDetail,setUserDetail}=useUserDetail();
    const convex=useConvex();

    useEffect(()=>{
        userDetail&&GetUserTrips();
    },[userDetail])

    const GetUserTrips=async()=>{
        const result= await convex.query(api.tripDetail.GetUserTrips,{
            uid:userDetail?._id
        });
        setMyTrips(result);
        console.log(result);
    }

  return (
    <div className='px-10 p-10 md:px-24 lg:px-48'>
        <h2 className='font-bold text-3xl'>My Trips</h2>
        {myTrips?.length==0&&
            <div className='p-7 border rounded-2xl flex flex-col items-center justify-center gap-5 mt-6'>
                <h2>You don't have any Trips created yet</h2>
                <a href={'/create-new-trip'}>
                    <Button>Create Trips</Button>
                </a>
            </div>
        }
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-5 mt-6'>
            {myTrips?.map((trip,index)=>(
               <MyTripItemCard trip={trip} key={index}/>
            ))}
        </div>
    </div>
  )
}

export default MyTrips;