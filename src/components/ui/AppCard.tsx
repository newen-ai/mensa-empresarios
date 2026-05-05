import { ReactNode } from "react";

type AppCardProps = {
  children: ReactNode;
  className?: string;
};

export function AppCard({ children, className = "" }: AppCardProps) {
  return <section className={`linkedin-card ${className}`.trim()}>{children}</section>;
}
