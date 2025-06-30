import { GraduationCap } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="section relative h-screen min-h-[600px] flex items-center justify-center text-center text-white pt-16"
      style={{
        backgroundImage:
          "linear-gradient(rgba(26, 62, 114, 0.8), rgba(26, 62, 114, 0.6)), url(/pic.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container max-w-4xl px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-shadow">
          كلية الهندسة - جامعة قناة السويس
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-shadow">
          تمكين مهندسي المستقبل من خلال التعليم المتطور والبحث العلمي المبتكر والخبرة العملية
          لمواجهة التحديات العالمية.
        </p>
        <Link
          href="/register"
          className="inline-flex items-center bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold px-8 py-3 text-lg rounded-md transition-colors"
        >
          <GraduationCap className="ml-2" />
          التقديم الآن
        </Link>
      </div>
    </section>
  );
}
