"use client"
"use client";
import "./styles.css";
import SideNav from "./_navbar/page";
import { Cairo } from "next/font/google";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from 'next/navigation';
import { UserContextProvider } from "@/context/UserContext";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
});

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <html lang="ar" dir="rtl">
      <head>
        <title>My App</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={cn(cairo.className, "min-h-screen bg-[#F9FAFB]")}>
        <UserContextProvider>
          {isAuthPage ? (
            children
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-[250px,1fr]">
              <aside className="sideNav">
                <SideNav />
              </aside>
              <main>{children}</main>
            </div>
          )}
        </UserContextProvider>
      </body>
    </html>
  );
}
