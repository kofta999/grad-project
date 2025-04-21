import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4" dir="rtl">
      <div className="text-center max-w-md mx-auto">
        {/* 404 text */}
        <h1 className="text-8xl font-bold text-blue-600 mb-2">404</h1>

        <h2 className="text-2xl font-bold text-blue-900 mb-4">الصفحة غير موجودة</h2>

        <p className="text-slate-600 mb-8">الصفحة التي تبحث عنها غير موجودة أو تم نقلها.</p>

        {/* Action button */}
        <Button asChild variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4 transform rotate-180" />
            العودة إلى الصفحة الرئيسية
          </Link>
        </Button>
      </div>
    </div>
  );
}
