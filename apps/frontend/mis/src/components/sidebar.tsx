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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/client";
import toast, { Toaster } from "react-hot-toast";

export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};

const STUDENT_SIDEBAR_ITEMS = [
  { title: "بيانات الطالب", path: "/dashboard", icon: <LayoutDashboard /> },
  { title: "تقدم الطالب", path: "/dashboard/progress", icon: <ChartLine /> },
  {
    title: "المرحلة التمهيدية",
    path: "/projects",
    icon: <ShieldBan />,
    submenu: true,
    subMenuItems: [
      // { title: "التسجيل", path: "/dashboard/log-courses" },
      { title: "المقررات الحالية", path: "/dashboard/current-courses" },
    ],
  },
  // { title: "المصروفات", path: "/messages", icon: <Wallet /> },
  {
    title: "الرسالة",
    path: "/dashboard/thesis",
    icon: <File />,
  },
  {
    title: "الاعدادات",
    path: "/dashboard/settings",
    icon: <Settings />,
    submenu: true,
    subMenuItems: [
      { title: "Account", path: "/dashboard/settings" },
      // { title: "Privacy", path: "/settings/privacy" },
    ],
  },
];

const ADMIN_SIDEBAR_ITEMS = [
  {
    title: "الطلبات المقدمة",
    path: "/dashboard/applications",
    icon: <LayoutDashboard />,
  },
  {
    title: "تسجيل المواد",
    path: "/dashboard/courseRegistrations",
    icon: <ChartLine />,
  },
  {
    title: "التقارير",
    path: "/dashboard/reports",
    icon: <File />,
  },
];

type SideNavProps = {
  role: "admin" | "student";
};

export default function SideNav({ role }: SideNavProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { loggedInUser, setLoggedInUser, isLoading } = useUserContext();

  const handleLogout = async () => {
    try {
      // First, navigate away from protected routes
      router.push("/login");

      // Then perform logout API call
      await apiClient.auth.logout.$post();

      // Finally update state
      setLoggedInUser(null);
      toast.success("تم تسجيل الخروج بنجاح");
    } catch (err) {
      toast.error("فشل تسجيل الخروج حاول مرة أخرى");
    }
  };

  const MenuItem = ({ item }: { item: any }) => {
    const pathname = usePathname();
    const [subMenuOpen, setSubMenuOpen] = useState(false);

    return (
      <div className="my-3 text-[#8C8C8C]">
        {item.submenu ? (
          <>
            <button
              onClick={() => setSubMenuOpen(!subMenuOpen)}
              className={`flex items-center p-2 rounded-sm w-full justify-between ${
                pathname.includes(item.path) ? "bg-blue-600 text-white hover:bg-blue-700" : ""
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
                {item.subMenuItems?.map((subItem: any, idx: number) => (
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
              pathname === item.path ? "bg-blue-600 text-white hover:bg-blue-700" : ""
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
      {loggedInUser && !isLoading && (
        <>
          <button
            className="xl:hidden fixed top-6 right-4 bg-blue-600 text-white p-2 rounded-full z-50"
            onClick={() => setIsOpen(true)}
          >
            <Menu />
          </button>

          {/* Sidebar */}
          <div
            className={`fixed top-0 right-0 h-screen overflow-y-auto bg-white z-50 shadow-lg p-4 flex flex-col justify-between w-[320px] transition-transform duration-300
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
              <Link href="/" className="block" onClick={() => setIsOpen(false)}>
                <Image src="/image.jpg" alt="logo" width={200} height={100} />
              </Link>

              {/* Navigation Items */}
              {(role === "admin" ? ADMIN_SIDEBAR_ITEMS : STUDENT_SIDEBAR_ITEMS).map(
                (item: any, idx: number) => (
                  <MenuItem key={idx} item={item} />
                )
              )}
            </div>

            {/* Footer Section */}
            <div className="footer">
              <div className="box bg-blue-600 text-white p-3 rounded-2xl">
                <div className="welcome flex items-center justify-between">
                  <h1 className="font-bold text-xl">مرحبا</h1>
                  {/* <Star /> */}
                </div>
                <p className="mt-3">هذا الحساب خاص ب{loggedInUser.name}، نتمنى لك يوماً طيباً.</p>
              </div>
              <div className="user flex mt-3 gap-2 items-center justify-between">
                <div className="flex gap-5">
                  <img src="/avatar.jpg" width={40} height={40} alt="avatar" />
                  <div className="info">
                    <h2 className="h2">{loggedInUser.name}</h2>
                    {/* TODO: Is it a good idea to show emails? */}
                    {/* <p className="text-sm text-[#8C8C8C]">
                      Waleed44@scu.edu.org
                    </p> */}
                  </div>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="cursor-pointer">
                      <LogOut />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-3 cursor-pointer">
                    <button onClick={() => handleLogout()} className="logout outline-none">
                      تسجيل الخروج
                    </button>
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
      )}
      {/* Hamburger Button */}
      <Toaster />
    </>
  );
}
