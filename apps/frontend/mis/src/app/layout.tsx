import "./styles.css";
import { Cairo } from "next/font/google";
import { cn } from "@/lib/utils";
import { UserContextProvider } from "@/context/user-context";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
});

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <title>كلية الهندسة - جامعة قناة السويس</title>
        <meta
          name="description"
          content="كلية الهندسة بجامعة قناة السويس - تعليم متطور وبحث علمي متميز"
        />
        <link rel="icon" href="/logo_with_transparent_bg.png" />
      </head>
      <body className={cn(cairo.className, "min-h-screen bg-[#F9FAFB]")}>
        <UserContextProvider>{children}</UserContextProvider>
      </body>
    </html>
  );
}
