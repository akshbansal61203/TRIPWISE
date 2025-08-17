// src/components/Chatbox.tsx
"use client"
import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Loader } from "lucide-react";
import axios from "axios";
import EmptyBoxState from "./EmptyBoxState";
import GroupSize from "./GroupSize";
import BudgetUi from "./BudgetUi";
import SelectDaysUi from "./SelectDaysUi";
import FinalUi from "./FinalUi";
import { useMutation } from "convex/react";
import {api} from '@/convex/_generated/api'
import { useTripDetail, useUserDetail } from "@/app/provider";
import {v4 as uuidv4} from 'uuid';
import { TripDetailContext } from "@/context/TripDetailContext";
type Message = {
  role: string;
  content: string;
  ui?: string;
};


export type TripInfo={
  budget:string;
  destination:string;
  duration:string;
  group_size:string;
  hotels:Hotel[];
  itinerary:Itinerary[];
  origin:string;
};



export type Hotel={
  hotel_name:string;
  hotel_address:string;
  price_per_night:string;
  hotel_image_url:string;
  geo_coordinates:{
    latitude:number;
    longitude:number;
  };
  rating:number;
  description:string;
};

export type Activity={
  place_name:string;
  place_details:string;
  place_image_url:string;
  geo_coordinates:{
    latitude:number;
    longitude:number;
  };
  place_address:string;
  ticket_pricing:string;
  time_travel_each_location:string;
  best_time_to_visit:string;
};

export type Itinerary={
  day:number;
  day_plan:string;
  best_time_to_visit_day:string;
  activities:Activity[];
};





function Chatbox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userinput, setUserinput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isFinal, setIsFinal] = useState(false);
const [tripDetail,setTripDetail]=useState<TripInfo>();
const SaveTripDetail=useMutation(api.tripDetail.CreateTripDetail);
const {userDetail,setuserdetail}=useUserDetail();
//@ts-ignore
const {tripDetailInfo,setTripDetailInfo}=useTripDetail();
  const onSend = async () => {
    if (!userinput.trim() && !isFinal) return; // Prevent sending empty messages unless it's the final step
    setLoading(true);
    const newMsg: Message = { role: "user", content: userinput };
    setMessages((prev) => [...prev, newMsg]);
    setUserinput("");
    try {
      const result = await axios.post("/api/aimodel", {
        messages: [...messages, newMsg],
        isFinal: isFinal,
      });
      console.log('Trip', result.data);
      if (!isFinal) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: result?.data?.resp || "No response", ui: result?.data?.ui },
        ]);
      }
      if(isFinal){
      setTripDetail(result?.data?.trip_plan);
      setTripDetailInfo(result?.data?.trip_plan);
      const tripId=uuidv4();
      await SaveTripDetail({
        tripDetail:result?.data?.trip_plan,
        tripId:tripId,
        uid:userDetail?._id
      });
    }

    } catch (error) {
      console.error(error);
    }
    
    setLoading(false);
  };

  const RenderGenerativeUi = (ui: string) => {
    if (ui === 'budget') {
      return <BudgetUi onSelectedOption={(v: string) => { setUserinput(v); onSend(); }} />;
    } else if (ui === 'groupSize') {
      return <GroupSize onSelectedOption={(v: string) => { setUserinput(v); onSend(); }} />;
    } else if (ui === 'TripDuration') {
      return <SelectDaysUi onSelectedOption={(v: string) => { setUserinput(v); onSend(); }} />;
    } else if (ui === 'final') {
      return <FinalUi viewTrip={() => console.log()}
      disable={!tripDetail}
       />;
    }
    return null;
  };

  useEffect(() => {
    const lstMsg = messages[messages.length - 1];
    if (lstMsg?.ui === 'final' && !isFinal) {
      setIsFinal(true);
      setUserinput('Ok,Great');
    
    }
  }, [messages, isFinal]);

  useEffect(()=>{
      if(isFinal&&userinput)onSend();
  },[isFinal])

  return (
    <div className="h-[85vh] flex flex-col border shadow rounded-2xl p-5">
      {messages.length === 0 && <EmptyBoxState onSelectOption={(v: string) => { setUserinput(v); onSend(); }} />}
      <section className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-lg px-4 py-2 rounded-xl ${
                msg.role === "user"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-black"
              }`}
            >
              {msg.content}
              {msg.ui && RenderGenerativeUi(msg.ui)}
            </div>
          </div>
        ))}
        {loading && (
          <div className='flex justify-start mt-2'>
            <div className="max-w-lg bg-gray-100 text-black px-4 py-2 rounded-xl">
              <Loader className="animate-spin" />
            </div>
          </div>
        )}
      </section>
      <section>
        <div className="border rounded-2xl p-4 shadow-2xl relative">
          <Textarea
            placeholder="Start your AI trip by typing here..."
            className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
            onChange={(e) => setUserinput(e.target.value)}
            value={userinput}
            disabled={loading}
          />
          <Button
            size="icon"
            className="absolute bottom-6 right-6"
            onClick={onSend}
            disabled={loading || !userinput.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}

export default Chatbox;