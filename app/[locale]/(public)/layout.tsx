import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import CartDrawer from "@/components/ui/CartDrawer";
import Preloader from "@/components/ui/Preloader";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Preloader />
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp />
      <CartDrawer />
    </>
  );
}
