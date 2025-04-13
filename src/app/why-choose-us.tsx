"use client";

import React, { useEffect, useRef } from "react";
import { Typography } from "@material-tailwind/react";
import {
  ChartPieIcon,
  CloudArrowDownIcon,
  CloudIcon,
  Cog6ToothIcon,
  KeyIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";

import BackgroundCard from "@/components/background-card";

interface OptionProps {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  index: number;
  animationType?: 'fade-left' | 'fade-right';
  delay?: number;
}

function Option({ icon: Icon, title, children, index, animationType = 'fade-left', delay = 0 }: OptionProps) {
  const optionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              if (entry.target.classList.contains('opacity-0')) {
                entry.target.classList.remove('opacity-0');
                entry.target.classList.add('animate-fade-in-left');
              }
            }, delay);
          } else {
            entry.target.classList.add('opacity-0');
            entry.target.classList.remove('animate-fade-in-left');
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: "0px" 
      }
    );

    if (optionRef.current) {
      observer.observe(optionRef.current);
    }

    return () => {
      if (optionRef.current) {
        observer.unobserve(optionRef.current);
      }
    };
  }, [delay, animationType]);

  return (
    <div 
      ref={optionRef}
      className={`opacity-0 option-item-${index} flex gap-4`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="mb-4">
        <Icon className="text-gray-900 h-6 w-6" />
      </div>
      <div>
        <Typography 
          variant="h5" 
          color="blue-gray" 
          className="mb-2"
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          {title}
        </Typography>
        <Typography 
          className="mb-2 md:w-10/12 font-normal !text-gray-500"
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          {children}
        </Typography>
      </div>
    </div>
  );
}

export function WhyChooseUs() {
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.add('translate-y-0');
          } else {
            entry.target.classList.remove('opacity-100');
            entry.target.classList.remove('translate-y-0');
          }
        });
      },
      { threshold: 0.1 }
    );

    // 현재 ref 값들을 변수에 저장
    const currentTitleRef = titleRef.current;
    const currentSubtitleRef = subtitleRef.current;

    if (currentTitleRef) {
      observer.observe(currentTitleRef);
    }
    if (currentSubtitleRef) {
      observer.observe(currentSubtitleRef);
    }

    return () => {
      if (currentTitleRef) {
        observer.unobserve(currentTitleRef);
      }
      if (currentSubtitleRef) {
        observer.unobserve(currentSubtitleRef);
      }
    };
  }, []);

  return (
    <section className="w-full max-w-4xl mx-auto flex flex-col items-center px-4 py-10">
      <div ref={titleRef} className="opacity-0 w-full text-center transform -translate-y-10 transition-all duration-1000 delay-500">
        <Typography 
          variant="h2" 
          className="text-center mb-2" 
          color="blue-gray"
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          왜 MaBle인가요?
        </Typography>
      </div>
      <div ref={subtitleRef} className="opacity-0 flex justify-center w-full transform -translate-y-10 transition-all duration-1000 delay-1000">
        <Typography
          variant="lead"
          className="mb-16 inline-block text-center font-normal !text-gray-500 whitespace-nowrap"
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          수많은 마케팅 대행사 사이, 우리가 선택받는 이유를 지금 확인해보세요.
        </Typography>
      </div>
      <div className="mt-8">
        <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-12 mb-24">
          <div className="flex items-center justify-center w-full">
            <BackgroundCard 
              title="검증된 마케팅 전문가" 
              video="/video/why-choose.mp4"
              position="left"
            >
              {`수많은 실전 프로젝트를 경험한 
업계 실무진이 직접 전략을 제시합니다.`}
            </BackgroundCard>
          </div>
          <div className="space-y-8">
            <div className="my-4">
              <Option icon={CloudIcon} title="브랜드 기초 설계" index={0} animationType="fade-left" delay={1500}>
                기초부터 탄탄하게. 브랜드의 방향성과
                기본 전략 구조를 정확히 설계합니다.
              </Option>
            </div>
            <div className="mb-4 flex gap-4">
              <Option icon={ChartPieIcon} title="고객과의 연결고리" index={1} animationType="fade-left" delay={1500}>
                데이터 흐름을 분석해 고객의 니즈를 파악하고,
                브랜드 메시지를 효과적으로 전달합니다.
              </Option>
            </div>
            <Option icon={Cog6ToothIcon} title="반응하는 마케팅 구조" index={2} animationType="fade-left" delay={1500}>
              캠페인의 흐름을 주도하며
              브랜드의 행동 전략을 유연하게 조율합니다.
            </Option>
          </div>
        </div>
        <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-12 mb-24">
          <div className="space-y-8">
            <div className="my-4">
              <Option icon={KeyIcon} title="브랜드의 일관된 흐름" index={3} animationType="fade-right" delay={1500}>
                고객 여정의 각 지점을 자연스럽게 연결해
                끊김 없는 브랜드 경험을 설계합니다.
              </Option>
            </div>
            <div className="mb-4 flex gap-4">
              <Option icon={UsersIcon} title="데이터 중심 전략 설계" index={4} animationType="fade-right" delay={1500}>
                고객 반응을 정교하게 수집·해석하여
                더 나은 마케팅 결정을 이끌어냅니다.
              </Option>
            </div>
            <Option icon={CloudArrowDownIcon} title="성과를 만드는 구조 관리" index={5} animationType="fade-right" delay={1500}>
              지속적인 성과 창출을 위한
              최적화된 마케팅 구조를 설계합니다.
            </Option>
          </div>
          <div className="flex items-center justify-center w-full">
            <BackgroundCard 
              title="함께 성장하는 파트너십" 
              video="/video/why-choose02.mp4"
              position="right"
            >
              {`고객과의 긴밀한 소통을 통해
              더 나은 전략을 함께 만들어갑니다.`}
            </BackgroundCard>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
