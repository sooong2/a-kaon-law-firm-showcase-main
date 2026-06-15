import { useState, useEffect, useRef } from "react";

interface CountUpProps {
  end: number;
  duration?: number;
  /** 뷰포트 진입(또는 즉시 시작) 후 카운트 시작까지 대기(ms) */
  delay?: number;
  /** true면 IntersectionObserver 없이 마운트 직후 시작 (히어로 등 상단 섹션용) */
  startOnMount?: boolean;
  suffix?: string;
  prefix?: string;
  className?: string;
}

const CountUp = ({
  end,
  duration = 2000,
  delay = 0,
  startOnMount = false,
  suffix = "",
  prefix = "",
  className = "",
}: CountUpProps) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (startOnMount) {
      setStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started, startOnMount]);

  useEffect(() => {
    if (!started) return;

    let frameId: number;
    const delayTimer = window.setTimeout(() => {
      let startTime: number;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * end));
        if (progress < 1) frameId = requestAnimationFrame(step);
      };
      frameId = requestAnimationFrame(step);
    }, delay);

    return () => {
      window.clearTimeout(delayTimer);
      cancelAnimationFrame(frameId);
    };
  }, [started, end, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

export default CountUp;
