"use client";
import { useState } from "react";
import {
  LayoutDashboard,
  ChartLine,
  ShieldBan,
  Wallet,
  File,
  ChevronDown,
  Settings,
  Star,
  LogOut,
  X,
  Menu,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SIDENAV_ITEMS = [
  { title: "بيانات الطالب", path: "/", icon: <LayoutDashboard /> },
  { title: "تقدم الطالب", path: "/progress", icon: <ChartLine /> },
  {
    title: "المرحلة التمهيدية",
    path: "/projects",
    icon: <ShieldBan />,
    submenu: true,
    subMenuItems: [
      { title: "التسجيل", path: "/log" },
      { title: "المقررات الحالية", path: "/register/step2" },
    ],
  },
  { title: "المصروفات", path: "/messages", icon: <Wallet /> },
  {
    title: "الرسالة",
    path: "/messsages",
    icon: <File />,
    submenu: true,
    subMenuItems: [
      { title: "Account", path: "/settings/account" },
      { title: "Privacy", path: "/settings/privacy" },
    ],
  },
  { title: "الاعدادات", path: "/settings", icon: <Settings /> },
];

export default function SideNav() {
  const [isOpen, setIsOpen] = useState(false);

  const MenuItem = ({ item }) => {
    const pathname = usePathname();
    const [subMenuOpen, setSubMenuOpen] = useState(false);

    return (
      <div className="my-3 text-[#8C8C8C]">
        {item.submenu ? (
          <>
            <button
              onClick={() => setSubMenuOpen(!subMenuOpen)}
              className={`flex items-center p-2 rounded-sm w-full justify-between ${
                pathname.includes(item.path)
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : ""
              }`}
            >
              <div className="flex gap-3 items-center">
                {item.icon}
                <span className="text-md">{item.title}</span>
              </div>
              <div className={`flex ${subMenuOpen ? "rotate-180" : ""}`}>
                <ChevronDown />
              </div>
            </button>

            {subMenuOpen && (
              <div className="mr-12 flex flex-col">
                {item.subMenuItems?.map((subItem, idx) => (
                  <Link
                    key={idx}
                    href={subItem.path}
                    onClick={() => setIsOpen(false)}
                    className={`mt-3 block p-2 rounded-sm ${
                      pathname.includes(subItem.path)
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : ""
                    }`}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </>
        ) : (
          <Link
            href={item.path}
            onClick={() => setIsOpen(false)}
            className={`flex gap-3 p-2 items-center rounded-sm ${
              pathname === item.path
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : ""
            }`}
          >
            {item.icon}
            <span className="text-md flex">{item.title}</span>
          </Link>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="xl:hidden fixed top-4 right-4 bg-blue-600 text-white p-2 rounded-full z-50"
        onClick={() => setIsOpen(true)}
      >
        <Menu />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen overflow-y-auto bg-white shadow-lg p-4 flex flex-col justify-between w-[320px] transition-transform duration-300 
        ${isOpen ? "translate-x-0 z-50" : "translate-x-full"} xl:translate-x-0 md:p-6`}
      >
        {/* Close Button (Only Visible on Small Screens) */}
        <button
          className="xl:hidden absolute top-4 left-4 text-gray-600"
          onClick={() => setIsOpen(false)}
        >
          <X size={24} />
        </button>

        {/* Logo */}
        <div className="w-full p-5">
          <Link
            href="/"
            className="block"
            onClick={() => setIsOpen(false)}
          >
            <Image src="/image.jpg" alt="logo" width={200} height={100} />
          </Link>

          {/* Navigation Items */}
          {SIDENAV_ITEMS.map((item: any, idx: number) => (
            <MenuItem key={idx} item={item} />
          ))}
        </div>

        {/* Footer Section */}
        <div className="footer">
          <div className="box bg-blue-600 text-white p-3 rounded-2xl">
            <div className="welcome flex items-center justify-between">
              <h1 className="font-bold text-xl">مرحبا</h1>
              <Star />
            </div>
            <p className="mt-3">هذا الحساب خاص بوليد حسن، نتمنى لك يوم مشرق.</p>
          </div>
          <div className="user flex mt-3 gap-2 items-center justify-between">
            <div className="flex gap-5">
              <img src="/avatar.jpg" width={40} height={40} alt="avatar" />
              <div className="info">
                <h2 className="h2">وليد حسن</h2>
                <p className="text-sm text-[#8C8C8C]">Waleed44@scu.edu.org</p>
              </div>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <div className="cursor-pointer">
                  <LogOut />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-3 cursor-pointer">
                <div className="logout">Logout</div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* Overlay (Closes Sidebar on Click) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 xl:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
