'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ArrowDown, Globe2, Send } from 'lucide-react'
import HeroVideoDialog from "@/components/magicui/hero-video-dialog"
import React from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
export const suggestions=[
    {
        title:'Create new trip',
        icon:<Globe2 className='text-blue-400 h-5 w-5'></Globe2>
    },
    {
        title:'Tell me where I can go',
        icon:<Globe2 className='text-green-500 h-5 w-5'></Globe2>
    },
    {
        title:'Discover Something New',
        icon:<Globe2 className='text-orange-400 h-5 w-5'></Globe2>
    },
    {
        title:'Adventure Destinations',
        icon:<Globe2 className='text-yellow-600 h-5 w-5'></Globe2>
    }
]
function Hero() {
    const {user}=useUser();
    const router=useRouter();
    const onSend=()=>{
        if(!user){
            router.push('sign-in');
            return ;
        }
        router.push('/create-new-trip')
    }
  return (
    <div className='mt-24 w-full flex justify-center'>
        {/* content */}
        <div className='text-center space-y-6'>
            <h1 className='text-xl md:text-5xl font-bold'>
                Hey,I am Your Personal <span className='text-primary'>Trip Planner</span> 
            </h1>
            <p className='text-lg'>Tell me what do you want,and I'll handle the rest: Flights, Hotels, Trip Planner - all in seconds</p>
            {/* Input Box  */}
            <div>
                <div className='border rounded-2xl p-4 shadow-2xl relative'>
                    <Textarea placeholder='Create a Trip for Paris ' className='w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none'>
                    </Textarea>
                    <Button size={'icon'} className='absolute bottom-6 right-6' onClick={()=>onSend()}>
                        <Send className='h-4 w-4'></Send>
                    </Button>
                </div>
            </div>
        {/* Suggestion List  */}
            <div className='flex gap-5'>
                {suggestions.map((suggestions,index)=>(
                    <div key={index} className='flex items-center gap-2 border rounded-full p-2 cursor-pointer hover:bg-purple-500 hover:text-white'>
                        {suggestions.icon}
                        <h2 className='text-sm '>{suggestions.title}</h2>
                    </div>
                ))}
            </div>
            <div className='flex items-center justify-center flex-col'>
                    <h2 className='my-7 mt-14 flex gap-2 '>Not sure where to start? <strong>See how it works</strong> <ArrowDown /></h2>
                     {/* Video Section  */}
                    <HeroVideoDialog
                        className="block dark:hidden"
                        animationStyle="from-center"
                        videoSrc="https://www.example.com/dummy-video"
                        thumbnailSrc="https://mma.prnewswire.com/media/2401528/1_MindtripProduct.jpg?width=3000&height=2800"
                        thumbnailAlt="Dummy Video Thumbnail"
                    />
            </div>
            
        </div>
    </div>
  )
}

export default Hero