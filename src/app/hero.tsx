"use client";

import { Button, Typography, Card } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

function Hero() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover"
        key="hero-video"
      >
        <source src="/video/background.mp4" type="video/mp4" />
        죄송합니다. 브라우저가 비디오 재생을 지원하지 않습니다.
      </video>
      <div className="absolute inset-0 h-full w-full bg-gray-900/60" />
      <div className="grid min-h-screen px-8">
        <div className="container relative z-10 my-auto mx-auto grid place-items-center text-center">
          <Typography
            variant="h1"
            color="white"
            className="md:max-w-full lg:max-w-3xl"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            브랜드의 성장을 디자인하다
          </Typography>
          <Typography
            variant="lead"
            color="white"
            className="mt-6 mb-10 w-full md:max-w-full lg:max-w-3xl"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            데이터와 감성을 바탕으로, 반응하는 브랜드를 만듭니다.
          </Typography>
          <div>
            <Button 
              variant="gradient" 
              color="white"
              className="text-lg font-bold px-8 py-3 rounded-[25px] bg-white/5 backdrop-blur-md border border-white/20 
              text-white shadow-lg transition-all duration-300 hover:bg-white hover:text-gray-900 
              hover:scale-105 hover:shadow-white/20"
              size="lg"
              onClick={() => router.push('/reservation')}
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              무료 컨설팅 받기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Hero;
