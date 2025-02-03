"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("supervisor");

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 p-4"
      dir="rtl"
    >
      <div className="w-full max-w-md space-y-8 bg-white rounded-2xl p-8 shadow-sm">
        <div className="flex flex-col items-center space-y-4">
          {/* You don't need /public */}
          <Image
            src="/test.jpg"
            alt="Faculty of Engineering Logo"
            width={120}
            height={120}
            className="w-auto h-auto"
          />
          <h1 className="text-2xl font-bold text-gray-900">مرحبا بك</h1>
          <p className="text-gray-600 text-center text-sm">
            الرجاء تسجيل الدخول للوصول إلى تجربتك التعليمية المخصصة
          </p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <Label className="text-gray-700">إسم المستخدم</Label>
            <Input
              type="text"
              placeholder="مثل: أحمد خالد"
              className="text-right"
            />
          </div>

          <div className="space-y-4">
            <RadioGroup
              defaultValue={userType}
              onValueChange={setUserType}
              className="flex justify-end gap-6"
            >
              <div className="flex items-center space-x-2 space-x-reverse">
                <Label htmlFor="supervisor">مشرف</Label>
                <RadioGroupItem value="supervisor" id="supervisor" />
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Label htmlFor="student">طالب</Label>
                <RadioGroupItem value="student" id="student" />
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Label htmlFor="doctor">دكتور</Label>
                <RadioGroupItem value="doctor" id="doctor" />
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-700">كلمة السر</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                className="text-right pr-4 pl-10"
                placeholder="7442#23"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
              </button>
            </div>
            <Link
              href="#"
              className="block text-sm text-indigo-600 hover:text-indigo-500 text-right"
            >
              هل نسيت كلمة السر ؟
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            تسجيل الدخول
          </Button>
        </form>
      </div>
    </div>
  );
}
