import type { Metadata } from "next";
import { Roboto, Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"], // variável suporta todos
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pinda.Studio | Cosmaker & Prop Maker",
  description: "Criação de armaduras, acessórios e props de alta qualidade para o seu cosplay.",
  keywords: ["cosplay", "cosmaker", "prop maker", "pinda studio", "armaduras"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`${roboto.variable} antialiased`}>{children}<Toaster position="top-center"/></body>
    </html>
  );
}
