"use client"
import React, { useEffect, useState } from 'react'
import { Timeline } from '@/components/ui/timeline'
import Image from 'next/image';
import { ArrowLeft, Clock, ExternalLink, Link, Star, Ticket, Timer, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Placeholder from '@/src/Placeholder.jpg';
import HotelCardItem from './HotelCardItem';
import PlaceCardItem from './PlaceCardItem';
import { useTripDetail } from '@/app/provider';
import { TripInfo } from './ChatBox';
import water from '@/src/water.jpg'
// const TRIP_DATA={
//         "destination": "Pune",
//         "duration": "2 Days",
//         "origin": "Mumbai",
//         "budget": "Moderate",
//         "group_size": "Couple",
//         "hotels": [
//             {
//                 "hotel_name": "The Ritz-Carlton, Pune",
//                 "hotel_address": "1, Rajaji Nagar, Yerwada, Pune, Maharashtra 411006, India",
//                 "price_per_night": "$200",
//                 "hotel_image_url": "https://www.ritzcarlton.com/en/hotels/india/pune/images/hotel-exterior-4.jpg",
//                 "geo_coordinates": {
//                     "latitude": 18.5394,
//                     "longitude": 73.8545
//                 },
//                 "rating": 4.5,
//                 "description": "Luxury hotel with excellent amenities"
//             },
//             {
//                 "hotel_name": "JW Marriott Hotel Pune",
//                 "hotel_address": "Senapati Bapat Rd, beside Pune Railway Station, Shivaji Nagar, Pune, Maharashtra 411016, India",
//                 "price_per_night": "$150",
//                 "hotel_image_url": "https://www.marriott.com/en-us/hotels/pnqjw-jw-marriott-hotel-pune/gallery/property-photos/?qSC=Y",
//                 "geo_coordinates": {
//                     "latitude": 18.526,
//                     "longitude": 73.8538
//                 },
//                 "rating": 4,
//                 "description": "Modern hotel with comfortable rooms and great service"
//             },
//             {
//                 "hotel_name": "Hyatt Pune",
//                 "hotel_address": "999, Pimpri-Chinchwad, Pune, Maharashtra 411017, India",
//                 "price_per_night": "$120",
//                 "hotel_image_url": "https://www.hyatt.com/en-US/hotel/india/hyatt-pune/pnqhy?y_source=1_MjIxMTc1OF8tYW5k",
//                 "geo_coordinates": {
//                     "latitude": 18.6061,
//                     "longitude": 73.8477
//                 },
//                 "rating": 4.2,
//                 "description": "Elegant hotel with stunning city views"
//             }
//         ],
//         "itinerary": [
//             {
//                 "day": 1,
//                 "day_plan": "Explore historical sites and enjoy local cuisine.",
//                 "best_time_to_visit_day": "Morning and evening",
//                 "activities": [
//                     {
//                         "place_name": "Shaniwar Wada",
//                         "place_details": "Historical fort",
//                         "place_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Shaniwar_Wada_Pune.jpg/1280px-Shaniwar_Wada_Pune.jpg",
//                         "geo_coordinates": {
//                             "latitude": 18.5193,
//                             "longitude": 73.8177
//                         },
//                         "place_address": "Shaniwar Peth, Pune, Maharashtra 411030, India",
//                         "ticket_pricing": "INR 50",
//                         "time_travel_each_location": "30 minutes",
//                         "best_time_to_visit": "Morning"
//                     },
//                     {
//                         "place_name": "Aga Khan Palace",
//                         "place_details": "Historical building with significance in the Indian independence movement",
//                         "place_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Aga_Khan_Palace%2C_Pune%2C_India.jpg/1280px-Aga_Khan_Palace%2C_Pune%2C_India.jpg",
//                         "geo_coordinates": {
//                             "latitude": 18.5077,
//                             "longitude": 73.8567
//                         },
//                         "place_address": "Yerwada, Pune, Maharashtra 411006, India",
//                         "ticket_pricing": "INR 25",
//                         "time_travel_each_location": "45 minutes",
//                         "best_time_to_visit": "Afternoon"
//                     },
//                     {
//                         "place_name": "Raja Dinkar Kelkar Museum",
//                         "place_details": "Museum showcasing a collection of Indian art and artifacts.",
//                         "place_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Raja_Dinkar_Kelkar_Museum%2C_Pune.jpg/1280px-Raja_Dinkar_Kelkar_Museum%2C_Pune.jpg",
//                         "geo_coordinates": {
//                             "latitude": 18.5201,
//                             "longitude": 73.8512
//                         },
//                         "place_address": "211, Bajirao Rd, Shukrawar Peth, Pune, Maharashtra 411002, India",
//                         "ticket_pricing": "INR 100",
//                         "time_travel_each_location": "1 hour",
//                         "best_time_to_visit": "Late afternoon"
//                     }
//                 ]
//             },
//             {
//                 "day": 2,
//                 "day_plan": "Explore Osho Ashram, Relax at a spa, and enjoy dinner at a restaurant with a view.",
//                 "best_time_to_visit_day": "Anytime",
//                 "activities": [
//                     {
//                         "place_name": "Osho Ashram",
//                         "place_details": "Spiritual center and meditation resort",
//                         "place_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Osho_Ashram_Pune.jpg/1280px-Osho_Ashram_Pune.jpg",
//                         "geo_coordinates": {
//                             "latitude": 18.5433,
//                             "longitude": 73.8467
//                         },
//                         "place_address": "Koregaon Park, Pune, Maharashtra 411001, India",
//                         "ticket_pricing": "Free",
//                         "time_travel_each_location": "30 minutes",
//                         "best_time_to_visit": "Morning"
//                     },
//                     {
//                         "place_name": "Relax at a Spa",
//                         "place_details": "Many spas are available in Pune",
//                         "place_image_url": "https://example.com/spa.jpg",
//                         "geo_coordinates": {
//                             "latitude": 18.5204,
//                             "longitude": 73.8567
//                         },
//                         "place_address": "Various locations in Pune",
//                         "ticket_pricing": "Varies",
//                         "time_travel_each_location": "1 hour",
//                         "best_time_to_visit": "Afternoon"
//                     },
//                     {
//                         "place_name": "Dinner with a View",
//                         "place_details": "Enjoy a romantic dinner with a beautiful view.",
//                         "place_image_url": "https://example.com/dinner.jpg",
//                         "geo_coordinates": {
//                             "latitude": 18.5394,
//                             "longitude": 73.8545
//                         },
//                         "place_address": "Various locations in Pune",
//                         "ticket_pricing": "Varies",
//                         "time_travel_each_location": "1 hour",
//                         "best_time_to_visit": "Evening"
//                     }
//                 ]
//             }
//         ]
//     }

function Itinerary() {
    //@ts-ignore
    const {tripDetailInfo,setTripDetailInfo}=useTripDetail();
    const [tripData,setTripData]=useState<TripInfo|null>(null);
    useEffect(()=>{
        tripDetailInfo&&setTripData(tripDetailInfo);
    },[tripDetailInfo])
  const data = tripData?[
    {
      title: "Recommended Hotels",
      content: (
        <div className='grid grid-cols-2 md:grid-cols-2 gap-4 '>
          {tripData?.hotels.map((hotels,index)=>(
            <HotelCardItem hotels={hotels} key={index}/>
          ))}
        </div>
      ),
    },
    ...tripData?.itinerary.map((dayData)=>({
        title:`Day ${dayData?.day}`,
        content:(
          <div>
              <p>Best Time:{dayData.best_time_to_visit_day}</p>
              <div className='grid grid-col-1 md:grid-cols-2 gap-4'>
                 {dayData?.activities.map((activity,index)=>(
                    <PlaceCardItem activity={activity} key={index}/>
              ))}
              </div>
             
          </div>
        )
    }))
  ]:[];
  return (
     
    <div className="relative w-full h-[83vh] overflow-auto">
        {/*@ts-ignore*/}
     {tripData?<Timeline data={data} tripData={tripData} />:
     <div>
         <h2 className='flex gap-2 items-center text-3xl text-white left-20 absolute bottom-20'><ArrowLeft></ArrowLeft>Getting to know you to build your perfect trip here...</h2>
     <Image src={water} alt='travel' width={1000} height={1000} className='w-ful h-full object-cover rounded-3xl'/>
     </div>
     }
    </div>
  );
}

export default Itinerary