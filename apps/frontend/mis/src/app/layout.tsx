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
