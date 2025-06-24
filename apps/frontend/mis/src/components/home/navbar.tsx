"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  ChevronDown,
  User,
  GraduationCap,
  BookOpen,
  FlaskConical,
  Calendar,
  NotebookPen,
  Mail,
} from "lucide-react";

interface NavLink {
  title: string;
  path: string;
  icon: React.ReactNode;
  subLinks?: { title: string; path: string }[];
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const navLinks: NavLink[] = [
    { title: "الرئيسية", path: "/", icon: <User size={20} className="ml-1" /> },
    { title: "عن الكلية", path: "/about", icon: <GraduationCap size={20} className="ml-1" /> },
    {
      title: "البرامج الأكاديمية",
      path: "/#programs-section",
      icon: <BookOpen size={20} className="ml-1" />,
      subLinks: [
        { title: "العمارة و التخطيط العمراني", path: "https://eng.suez.edu.eg/?page_id=8426" },
        { title: "الهندسة الميكانيكية", path: "https://eng.suez.edu.eg/?page_id=5443" },
        { title: "الهندسة الكهربائية", path: "https://eng.suez.edu.eg/?page_id=5441" },
        { title: "الهندسة المدنية", path: "https://eng.suez.edu.eg/?page_id=5433" },
      ],
    },
    {
      title: "البحث العلمي",
      path: "https://eng.suez.edu.eg/?s=%D8%A7%D9%84%D8%A8%D8%AD%D8%AB+%D8%A7%D9%84%D8%B9%D9%84%D9%85%D9%8A",
      icon: <FlaskConical size={20} className="ml-1" />,
    },
    { title: "الفعاليات", path: "/#news-section", icon: <Calendar size={20} className="ml-1" /> },
    { title: "بوابة الطالب", path: "/login", icon: <NotebookPen size={20} className="ml-1" /> },
    { title: "اتصل بنا", path: "/#contact-section", icon: <Mail size={20} className="ml-1" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSubMenu = (title: string) => {
    setOpenSubMenu(openSubMenu === title ? null : title);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-blue-600 shadow-lg py-2" : "bg-blue-600/95 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center flex-1">
            <Image
              src="/logo_with_transparent_bg.png"
              alt="شعار كلية الهندسة"
              width={60}
              height={60}
              className=""
            />
            <div className="text-white font-medium text-xs hidden md:block ">
              <h1>كلية الهندسة</h1>
              <h3>جامعة قناة السويس</h3>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => (
              <div key={link.title} className="relative group">
                {link.subLinks ? (
                  <>
                    <button
                      onClick={() => toggleSubMenu(link.title)}
                      className="flex items-center text-white hover:text-yellow-300 px-4 py-2 font-medium transition-colors"
                    >
                      {link.icon}
                      <span className="mx-2">{link.title}</span>
                      <ChevronDown size={16} className="transition-transform duration-200" />
                    </button>

                    {openSubMenu === link.title && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-50 border border-gray-100">
                        {link.subLinks.map((subLink) => (
                          <Link
                            key={subLink.title}
                            href={subLink.path}
                            className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 text-right transition-colors border-b border-gray-100 last:border-0"
                          >
                            {subLink.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    key={link.title}
                    href={link.path}
                    className="flex items-center text-white hover:text-yellow-300 px-4 py-2 font-medium transition-colors"
                  >
                    {link.icon}
                    <span className="mx-2">{link.title}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          <button
            className="md:hidden text-white focus:outline-none p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="قائمة التنقل"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-blue-800 mt-2 rounded-lg py-3 shadow-inner">
            {navLinks.map((link) => (
              <div key={link.title} className="px-3">
                {link.subLinks ? (
                  <div className="mb-2">
                    <button
                      onClick={() => toggleSubMenu(link.title)}
                      className="flex items-center justify-between w-full text-white px-3 py-3 font-medium hover:bg-blue-700 rounded-lg transition-colors"
                    >
                      <div className="flex items-center">
                        {link.icon}
                        <span className="mr-2">{link.title}</span>
                      </div>
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-200 ${
                          openSubMenu === link.title ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {openSubMenu === link.title && (
                      <div className="pr-4 mt-1 space-y-1 bg-blue-900/50 rounded-lg p-2">
                        {link.subLinks.map((subLink) => (
                          <Link
                            key={subLink.title}
                            href={subLink.path}
                            className="block text-blue-100 hover:text-white px-4 py-2.5 text-sm hover:bg-blue-700 rounded transition-colors"
                          >
                            {subLink.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.title}
                    href={link.path}
                    className="flex items-center text-white hover:bg-blue-700 px-3 py-3 rounded-lg font-medium transition-colors"
                  >
                    {link.icon}
                    <span className="mr-2">{link.title}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
