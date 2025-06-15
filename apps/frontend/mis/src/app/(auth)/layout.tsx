import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const token = cookies().get("jwtToken");

  if (token) {
    redirect("/dashboard");
  }

  return children;
}
