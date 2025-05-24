"use client";
import { useEffect, useState, useRef } from "react";
import { Users, GraduationCap, Briefcase, Award } from "lucide-react";

interface StatItem {
  id: string;
  value: number;
  label: string;
  icon: React.ReactNode;
}

export default function StatsSection() {
  const stats = useRef<StatItem[]>([
    {
      id: "1",
      value: 2202,
      label: "طلاب",
      icon: <Users className="text-yellow-400" size={32} />,
    },
    {
      id: "2",
      value: 152,
      label: "أعضاء هيئة تدريس",
      icon: <GraduationCap className="text-yellow-400" size={32} />,
    },
    {
      id: "3",
      value: 113,
      label: "موظفين",
      icon: <Briefcase className="text-yellow-400" size={32} />,
    },
    {
      id: "4",
      value: 336,
      label: "خريجين",
      icon: <Award className="text-yellow-400" size={32} />,
    },
  ]).current;

  const [animatedStats, setAnimatedStats] = useState<StatItem[]>(
    stats.map((stat) => ({ ...stat, value: 0 }))
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(document.getElementById("stats-section")!);

    return () => observer.disconnect();
  }, []);

  const startAnimation = () => {
    const duration = 4000; // 4s
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setAnimatedStats((prev) =>
        prev.map((stat, i) => ({
          ...stat,
          value: Math.floor(easeOutQuad(progress) * stats[i].value),
        }))
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const easeOutQuad = (t: number) => {
    return t * (2 - t);
  };

  return (
    <section id="stats-section" className="py-16 bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">احصائيات 2024/2025</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {animatedStats.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col items-center text-center p-6 bg-blue-500 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-4 p-3 bg-blue-800 rounded-full">{stat.icon}</div>
              <span className="text-4xl font-bold mb-2 text-yellow-400">
                {stat.value.toLocaleString()}+
              </span>
              <h3 className="text-xl font-medium">{stat.label}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
