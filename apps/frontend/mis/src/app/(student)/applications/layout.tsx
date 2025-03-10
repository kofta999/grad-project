import { ApplicationIdProvider } from "./application-id-context";

export default function ApplicationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApplicationIdProvider>{children}</ApplicationIdProvider>;
}
