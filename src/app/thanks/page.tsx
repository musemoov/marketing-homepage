"use client";

import { Card, Typography, Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

export default function Thanks() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30 backdrop-blur-[100px]" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <Card 
          className="max-w-xl mx-auto backdrop-blur-md bg-white/40 border border-white/50 shadow-xl rounded-2xl p-8 text-center"
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          <Typography 
            variant="h2" 
            className="text-3xl font-bold text-gray-800 mb-4"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            예약이 완료되었습니다
          </Typography>
          <Typography 
            variant="paragraph" 
            className="text-gray-600 mb-8"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            빠른 시일 내에 담당자가 연락드리겠습니다.
          </Typography>
          <Button
            variant="gradient"
            color="blue"
            className="mt-4"
            onClick={() => router.push('/')}
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            홈으로 돌아가기
          </Button>
        </Card>
      </div>
    </div>
  );
} 