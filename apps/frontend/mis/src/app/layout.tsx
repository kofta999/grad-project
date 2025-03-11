"use client"
import "./styles.css";
import SideNav from "./_navbar/page";
import { Cairo } from "next/font/google";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from 'next/navigation';



const cairo = Cairo({
  subsets: ["arabic", "latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const pathname = usePathname();  
  const router = useRouter();
  if (pathname === '/login' || pathname === '/register') {
    return (
        <html lang="ar" dir="rtl">
          <body>
            <main>{children}</main>
          </body>
        </html>
    );
  }
  return (
    <html lang="ar" dir="rtl">
      <body
        className={cn(
          cairo.className,
          "grid grid-cols-1 xl:grid-cols-[250px,1fr] min-h-screen bg-[#F9FAFB]",
        )}
      >
        <div className="sideNav">
          <SideNav />
        </div>
        <main>{children}</main>
      </body>
    </html>
  );
}
