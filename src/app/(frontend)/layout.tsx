import { Footer } from "@/components/Footer";
import Navbar from "@/components/NavBar";
import WhatsAppButton from "@/components/WhatsAppBtn";
import { SanityLive } from "@/sanity/lib/live";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Navbar />
      <WhatsAppButton />
      {children}
      <Footer />
      <SanityLive />
    </main>
  );
}
