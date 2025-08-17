"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function PopularCityList() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20 ">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
      Travel by feeling — swipe to discover.
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

interface DestinationContentProps {
  place: string;
  image: string;
}

const DestinationContent = ({
  place,
  image,
}: {
  place: string;
  image: string;
}) => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Discover {place} like never before.
        </span>{" "}
        From breathtaking views to unforgettable experiences, explore local
        culture, indulge in authentic cuisine, and create memories that last a
        lifetime. Whether you're an adventurer or a peace-seeker, {place} offers
        something magical for every traveler.
      </p>
      <img
        src={image}
        alt={`${place} mockup`}
        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
      />
    </div>
  );
};

const data = [
  {
    category: "Santorini, Greece",
    title: "Whitewashed architecture meets sapphire seas.",
    src: "https://images.unsplash.com/photo-1678266561093-324802646fb2?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: (
      <DestinationContent
        place="Santorini, Greece"
        image="https://images.unsplash.com/photo-1678266561093-324802646fb2?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    ),
  },
  {
    category: "Kyoto, Japan",
    title: "Timeless temples and cherry blossoms in full bloom.",
    src: "https://images.unsplash.com/photo-1522547902298-51566e4fb383?q=80&w=2976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: (
      <DestinationContent
        place="Kyoto, Japan"
        image="https://images.unsplash.com/photo-1522547902298-51566e4fb383?q=80&w=2976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    ),
  },
  {
    category: "Banff, Canada",
    title: "Turquoise lakes surrounded by towering peaks.",
    src: "https://images.unsplash.com/photo-1508264165352-258db2ebd59b?auto=format&fit=crop&w=1000&q=80",
    content: (
      <DestinationContent
        place="Banff, Canada"
        image="https://images.unsplash.com/photo-1508264165352-258db2ebd59b?auto=format&fit=crop&w=1000&q=80"
      />
    ),
  },
  {
    category: "Dubai, UAE",
    title: "Where luxury meets futuristic architecture.",
    src: "https://images.unsplash.com/photo-1459787915554-b34915863013?q=80&w=933&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: (
      <DestinationContent
        place="Dubai, UAE"
        image="https://images.unsplash.com/photo-1459787915554-b34915863013?q=80&w=933&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    ),
  },
  {
    category: "Cape Town, South Africa",
    title: "Table Mountain watching over vibrant city life.",
    src: "https://images.unsplash.com/photo-1529528070131-eda9f3e90919?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: (
      <DestinationContent
        place="Cape Town, South Africa"
        image="https://images.unsplash.com/photo-1529528070131-eda9f3e90919?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    ),
  },
  {
    category: "Machu Picchu, Peru",
    title: "Ancient Incan city above the clouds.",
    src: "https://images.unsplash.com/photo-1664387518989-bb1d8574f078?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: (
      <DestinationContent
        place="Machu Picchu, Peru"
        image="https://images.unsplash.com/photo-1664387518989-bb1d8574f078?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    ),
  },
];


