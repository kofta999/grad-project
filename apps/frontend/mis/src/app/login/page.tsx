"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { hcWithType } from "@repo/mis-api";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"student" | "admin">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState<string | null>(null);

  const client = hcWithType("http://localhost:3000", {
    init: { credentials: "include" },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //setLoading(true);
    setError(null);

    try {
      const res = await client.auth.login.$post({
        json: {
          email: email,
          password: password,
          role: userType,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      console.log(res.headers);

      const result = await res.json();
      console.log("Login succesful", result);

      alert("تم الدخول بنجاح");

      // TODO: Redirect after login
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "فشل تسجيل الدخول حاول مرة اخرى",
      );
    }
  }; //finally {
  //setLoading(false);
  //}

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-sky-100 p-4"
      dir="rtl"
    >
      <div className="w-full max-w-md space-y-8 bg-white rounded-2xl p-8 shadow-sm">
        <div className="flex flex-col items-center space-y-4">
          {/* You don't need /public */}
          <Image
            src="/920658.jpg"
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-gray-700">إسم المستخدم</Label>
            <Input
              type="text"
              placeholder="مثل: أحمد خالد"
              className="text-right"
              value={email}
              name="email"
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-4">
            <RadioGroup
              defaultValue={userType}
              // @ts-ignore Ik what im doing
              onValueChange={setUserType}
              className="flex justify-end gap-6"
            >
              {/* will set admin for now */}
              <div className="flex items-center space-x-2 space-x-reverse">
                <Label htmlFor="admin">مشرف</Label>
                <RadioGroupItem value="admin" id="admin" />
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Label htmlFor="student">طالب</Label>
                <RadioGroupItem value="student" id="student" />
              </div>
              {/* Should be doctor but will set admin for now */}
              <div className="flex items-center space-x-2 space-x-reverse">
                <Label htmlFor="admin">دكتور</Label>
                <RadioGroupItem value="admin" id="admin" />
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-700">كلمة السر</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                className="text-right pr-4 pl-10"
                onChange={handleInputChange}
                value={password}
                name="password"
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
        <p className="mt-4 text-center text-gray-500">
          غير مسجل على الموقع ؟
          <a href="/register" className="text-blue-500 hover:underline ml-1">
            تسجيل حساب
          </a>
        </p>
      </div>
    </div>
  );
}
