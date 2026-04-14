"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface AnimateOnScrollProps {
  children: ReactNode;
  animation?: string;
  delay?: number;
  className?: string;
}

export default function AnimateOnScroll({
  children,
  animation = "animate-fade-in-up",
  delay = 0,
  className = "",
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? animation : "opacity-0"}`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      {children}
    </div>
  );
}
