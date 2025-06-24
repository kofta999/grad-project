import { Facebook, Twitter, Linkedin, Youtube, Instagram } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const quickLinks = [
    { title: "الرئيسية", path: "/" },
    { title: "عن الكلية", path: "/about" },
    { title: "البرامج الأكاديمية", path: "/#programs-section" },
    {
      title: "البحث العلمي",
      path: "https://eng.suez.edu.eg/?s=%D8%A7%D9%84%D8%A8%D8%AD%D8%AB+%D8%A7%D9%84%D8%B9%D9%84%D9%85%D9%8A",
    },
    { title: "الفعاليات", path: "/#news-section" },
    { title: "مجلة الكليه", path: "https://sceee.journals.ekb.eg/" },
  ];

  const contactInfo = [
    { text: "الإسماعيلية، مصر", icon: "📍" },
    { text: "itunit@eng.suez.edu.eg", icon: "✉️" },
    { text: "(+2064)3223007 – 32001258", icon: "📞" },
  ];

  return (
    <footer id="contact-section" className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center mb-6">
              <Image src="/logo_with_transparent_bg.png" alt="شعار الكلية" width={60} height={60} />
              <h3 className="text-xl font-bold">كلية الهندسة</h3>
            </div>
            <p className="text-gray-400 mb-4">
              جامعة قناة السويس - تمكن مهندسي المستقبل من خلال التعليم المتطور والبحث العلمي المبتكر
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-yellow-400">روابط سريعة</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.path}
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    <span className="ml-2">→</span>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-yellow-400">اتصل بنا</h3>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="ml-2">{item.icon}</span>
                  <span className="text-gray-400">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-yellow-400">النشرة البريدية</h3>
            <p className="text-gray-400 mb-4">
              اشترك في نشرتنا البريدية لتصلك آخر الأخبار والتحديثات
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="bg-gray-800 text-white px-4 py-2 rounded-r-md focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full"
              />
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium px-4 py-2 rounded-l-md transition-colors"
              >
                اشترك
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-white">
          <p>© {new Date().getFullYear()} كلية الهندسة - جامعة قناة السويس. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
