import Navbar        from "@/components/Navbar";
import Hero          from "@/components/Hero";
import Brands        from "@/components/Brands";
import Products      from "@/components/Products";
import CatalogSearch   from "@/components/CatalogSearch";
// import MedidasCatalogo from "@/components/MedidasCatalogo"; // oculto temporalmente
import About           from "@/components/About";
import Gallery       from "@/components/Gallery";
import SocialVideos  from "@/components/SocialVideos";
import Contact       from "@/components/Contact";
import Footer        from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import AiChat        from "@/components/AiChat";
import ProtectImages from "@/components/ProtectImages";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Brands />
        <Products />
        <CatalogSearch />
        {/* <MedidasCatalogo /> oculto temporalmente */}
        <About />
        <Gallery />
        <SocialVideos />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <AiChat />
      <ProtectImages />
    </>
  );
}
