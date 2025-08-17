"use client"
import React, { useEffect, useState } from 'react'
import ChatBox from './_components/ChatBox'
import Itinerary from './_components/Itinerary'
import { useTripDetail } from '../provider'
import GlobalMap from './_components/GlobalMap'
import { Button } from '@/components/ui/button'
import { Globe2, Plane } from 'lucide-react'
const Trip_Data={
        "destination": "Pune",
        "duration": "2 Days",
        "origin": "Mumbai",
        "budget": "Cheap",
        "group_size": "1",
        "hotels": [
            {
                "hotel_name": "Hotel Samrat",
                "hotel_address": "111, MG Road, Pune, Maharashtra 411001",
                "price_per_night": "₹1500",
                "hotel_image_url": "https://example.com/hotelsamrat.jpg",
                "geo_coordinates": {
                    "latitude": 18.5204,
                    "longitude": 73.8567
                },
                "rating": 4,
                "description": "A budget-friendly hotel in the heart of Pune"
            },
            {
                "hotel_name": "Zostel Pune",
                "hotel_address": "123, Koregaon Park, Pune, Maharashtra 411001",
                "price_per_night": "₹1000",
                "hotel_image_url": "https://example.com/zostelpune.jpg",
                "geo_coordinates": {
                    "latitude": 18.5204,
                    "longitude": 73.8567
                },
                "rating": 4.5,
                "description": "A hostel with private and dorm rooms"
            }
        ],
        "itinerary": [
            {
                "day": 1,
                "day_plan": "Explore historical sites and enjoy Maharashtrian dinner",
                "best_time_to_visit_day": "Morning and Evening",
                "activities": [
                    {
                        "place_name": "Shaniwar Wada",
                        "place_details": "Historical fort",
                        "place_image_url": "https://example.com/shaniwarwada.jpg",
                        "geo_coordinates": {
                            "latitude": 18.5124,
                            "longitude": 73.8567
                        },
                        "place_address": "Shaniwar Peth, Pune, Maharashtra 411030",
                        "ticket_pricing": "₹50",
                        "time_travel_each_location": "30 mins",
                        "best_time_to_visit": "Morning"
                    },
                    {
                        "place_name": "Aga Khan Palace",
                        "place_details": "Historical palace",
                        "place_image_url": "https://example.com/agakhanpalace.jpg",
                        "geo_coordinates": {
                            "latitude": 18.5124,
                            "longitude": 73.8567
                        },
                        "place_address": "Yerwada, Pune, Maharashtra 411006",
                        "ticket_pricing": "₹50",
                        "time_travel_each_location": "45 mins",
                        "best_time_to_visit": "Afternoon"
                    },
                    {
                        "place_name": "Local Restaurant",
                        "place_details": "Maharashtrian Cuisine",
                        "place_image_url": "https://example.com/localrestaurant.jpg",
                        "geo_coordinates": {
                            "latitude": 18.5204,
                            "longitude": 73.8567
                        },
                        "place_address": "Near Shaniwar Wada",
                        "ticket_pricing": "₹300",
                        "time_travel_each_location": "15 mins",
                        "best_time_to_visit": "Evening"
                    }
                ]
            },
            {
                "day": 2,
                "day_plan": "Visit Osho Ashram, Dagdusheth Halwai Ganapati Temple and relax by the Mula-Mutha River",
                "best_time_to_visit_day": "Morning and Afternoon",
                "activities": [
                    {
                        "place_name": "Osho Ashram",
                        "place_details": "Meditation and spiritual center",
                        "place_image_url": "https://example.com/oshoashram.jpg",
                        "geo_coordinates": {
                            "latitude": 18.5204,
                            "longitude": 73.8567
                        },
                        "place_address": "Koregaon Park, Pune, Maharashtra 411001",
                        "ticket_pricing": "Free",
                        "time_travel_each_location": "30 mins",
                        "best_time_to_visit": "Morning"
                    },
                    {
                        "place_name": "Dagdusheth Halwai Ganapati Temple",
                        "place_details": "Hindu Temple",
                        "place_image_url": "https://example.com/dagdushethtemple.jpg",
                        "geo_coordinates": {
                            "latitude": 18.5204,
                            "longitude": 73.8567
                        },
                        "place_address": "Budhwar Peth, Pune, Maharashtra 411002",
                        "ticket_pricing": "Free",
                        "time_travel_each_location": "45 mins",
                        "best_time_to_visit": "Late Morning"
                    },
                    {
                        "place_name": "Mula-Mutha River",
                        "place_details": "Riverfront area",
                        "place_image_url": "https://example.com/mula-mutha.jpg",
                        "geo_coordinates": {
                            "latitude": 18.5204,
                            "longitude": 73.8567
                        },
                        "place_address": "Pune, Maharashtra",
                        "ticket_pricing": "Free",
                        "time_travel_each_location": "15 mins",
                        "best_time_to_visit": "Afternoon"
                    }
                ]
            }
        ]
    }
    
function CreateNewTrip() {
    //@ts-ignore
    const {tripDetailInfo,setTripDetailInfo}=useTripDetail();
    const [activeIndex,setactiveIndex]=useState(1);
    useEffect(()=>{
        setTripDetailInfo(null);
    },[])
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-10'>
        <div>
            <ChatBox/>
        </div>
        <div className='col-span-2 relative'>
          {activeIndex==0 ? <Itinerary/>:<GlobalMap/>}
          <Button size={'lg'}
          onClick={()=>setactiveIndex(activeIndex==0?1:0)}
          className='absolute bottom-10 left-[46%] bg-black hover:bg-blue-300'>{activeIndex==0?<Plane/>:<Globe2/>}</Button>
        </div>
    </div>
  )
}

export default CreateNewTrip