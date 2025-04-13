import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Typography } from "@material-tailwind/react";

interface BackgroundCardProps {
  title: string;
  children: React.ReactNode;
  image?: string;
  video?: string;
  position?: "left" | "right";
}

export function BackgroundCard({ 
  title, 
  children, 
  image, 
  video, 
  position = "left" 
}: BackgroundCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('slide-up');
            if (textRef.current) {
              textRef.current.classList.add(position === "left" ? 'slide-right' : 'slide-left');
              textRef.current.classList.remove('opacity-0');
            }
          } else {
            entry.target.classList.remove('slide-up');
            if (textRef.current) {
              textRef.current.classList.remove(position === "left" ? 'slide-right' : 'slide-left');
              textRef.current.classList.add('opacity-0');
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentCardRef = cardRef.current;

    if (currentCardRef) {
      observer.observe(currentCardRef);
    }

    return () => {
      if (currentCardRef) {
        observer.unobserve(currentCardRef);
      }
    };
  }, [position]);

  return (
    <div ref={cardRef} className="relative w-full min-h-[400px] bg-gray-900 rounded-xl overflow-hidden opacity-0">
      {video ? (
        <div className="absolute inset-0">
          <video
            src={video}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ) : image && (
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/85" />
        </div>
      )}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <div ref={textRef} className="opacity-0 mt-32">
          <Typography 
            variant="h2" 
            className="text-center mb-6 text-3xl" 
            color="white"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            {title}
          </Typography>
          <Typography
            color="white"
            className="text-lg max-w-2xl text-center font-normal whitespace-pre-line"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            {children}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default BackgroundCard;