import Aurora from "@/components/Aurora";
import ShaderField from "@/components/ShaderField";
import FieldScrim from "@/components/FieldScrim";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Intro from "@/components/Intro";
import Cursor from "@/components/Cursor";

export default function Home() {
  return (
    <>
      <Aurora />
      <ShaderField />
      <FieldScrim />
      <Nav />
      <main>
        <Hero />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
      <Intro />
      <Cursor />
    </>
  );
}
