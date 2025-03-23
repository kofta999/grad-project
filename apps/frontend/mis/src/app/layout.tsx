"use client";
import "./styles.css";
import { Cairo } from "next/font/google";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { UserContextProvider } from "@/context/UserContext";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
});

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  const pathname = usePathname();
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/applications";

  return (
    <html lang="ar" dir="rtl">
      <head>
        <title>بوابة كلية الهندسة - جامعة قناة السويس</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={cn(cairo.className, "min-h-screen bg-[#F9FAFB]")}>
        <UserContextProvider>{children}</UserContextProvider>
      </body>
    </html>
  );
}
