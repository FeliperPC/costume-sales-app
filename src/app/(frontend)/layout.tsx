import { Footer } from "@/components/Footer";
import Navbar from "@/components/NavBar";
import { SanityLive } from "@/sanity/lib/live";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Navbar />
      {children}
      <Footer />
      <SanityLive />
    </main>
  );
}
