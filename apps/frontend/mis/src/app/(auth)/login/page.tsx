"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { InferRequestType } from "@repo/mis-api";
import { apiClient } from "@/lib/client";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/user-context";
import { Loader } from "@/components/ui/loader";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import facultyLogo from "../../../../public/facultyLogo.jpg";
import universityLogo from "../../../../public/universityLogo.jpg";

type FormState = InferRequestType<typeof apiClient.auth.login.$post>["json"];

export default function LoginForm() {
  const router = useRouter();

  const { setLoggedInUser } = useUserContext();

  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState<FormState>({
    email: "",
    password: "",
    role: "student",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await apiClient.auth.login.$post({
        json: formState,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const result = await res.json();
      setLoggedInUser(result);
      setLoading(false);

      router.push("/dashboard");
      // Took me 1h to figure out this
      // If I didn't use this, and logged out as a student then logged in as an admin or vice versa
      // Next cache will still use the old page (more like the old cookies that render the student page)
      // So using this (exactly after pushing) will invalidate the cache and use latest cookies
      // I hate this framework...
      router.refresh();
      toast.success("تم الدخول بنجاح");
    } catch (err) {
      console.error("Login error:", err);
      toast.error("فشل تسجيل الدخول حاول مرة اخرى");
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRoleChange = (value: "student" | "admin") => {
    setFormState((prevState) => ({
      ...prevState,
      role: value,
    }));
  };

  return (
    <div className="backImg">
      <Container className="flex items-center justify-center h-screen max-w-xl">
        <Card>
          <CardContent>
            <CardHeader className="bg-white">
              <div className="flex items-center justify-between">
                <Image
                  src={facultyLogo}
                  alt="Faculty of Engineering Logo"
                  width={120}
                  height={120}
                />
                <Image src={universityLogo} alt="University Logo" width={95} height={95} />
              </div>
              <CardTitle className="flex-col">
                <h1 className="text-2xl font-bold text-gray-900 text-center">مرحبا بك</h1>
                <p className="text-gray-600 text-center text-sm mt-2">
                  الرجاء تسجيل الدخول للوصول إلى تجربتك التعليمية المخصصة
                </p>
              </CardTitle>
            </CardHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-700">البريد الالكتروني</Label>
                <Input
                  type="text"
                  placeholder="أدخل البريد الالكتروني"
                  className="text-right"
                  value={formState.email}
                  name="email"
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-4">
                <RadioGroup
                  defaultValue={formState.role}
                  // @ts-ignore Ik what im doing
                  onValueChange={handleRoleChange}
                  className="flex justify-end gap-3"
                >
                  {/* will set admin for now */}
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Label htmlFor="admin" className="mr-2">
                      مشرف
                    </Label>
                    <RadioGroupItem value="admin" id="admin" />
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Label htmlFor="student" className="mr-2">
                      طالب
                    </Label>
                    <RadioGroupItem value="student" id="student" />
                  </div>
                  {/* Should be doctor but will set admin for now */}
                  {/* <div className="flex items-center space-x-2 space-x-reverse">
                    <Label htmlFor="admin" className="mr-2">
                      دكتور
                    </Label>
                    <RadioGroupItem value="admin" id="admin" />
                  </div> */}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700">كلمة السر</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    className="text-right pr-3 pl-10"
                    onChange={handleInputChange}
                    value={formState.password}
                    name="password"
                    placeholder="أدخل كلمة السر"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeIcon className="h-4 w-4 text-mainColor" />
                    ) : (
                      <EyeOffIcon className="h-4 w-4 text-mainColor" />
                    )}
                  </button>
                </div>
                <Link
                  href="#"
                  className="block text-sm text-mainColor hover:text-blue-600 text-right"
                >
                  هل نسيت كلمة السر ؟
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-mainColor hover:bg-blue-700 text-white"
                disabled={loading}
              >
                {loading ? <Loader className="w-6 h-6" /> : "تسجيل الدخول"}
              </Button>
            </form>
            <p className="mt-4 text-center text-gray-500">
              غير مسجل على الموقع ؟
              <Link href="/register" className="text-mainColor hover:underline mr-1">
                تسجيل حساب
              </Link>
            </p>
          </CardContent>
        </Card>

        <Toaster />
      </Container>
    </div>
  );
}
