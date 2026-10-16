
import Navbar from "../components/layout/Navbar";
import Hero from "../features/home/components/hero";
// import Services from "../features/services/components/Services";
// import Projects from "../features/portfolio/components/Projects";
// import About from "../features/about/components/About";
// import Process from "../features/process/components/Process";
// import Blog from "../features/blog/components/Blog";
// import ContactForm from "../features/contact/components/ContactForm";
// import Footer from "../components/layout/Footer";

export default function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        {/* <Services />
        <Projects />
        <About />
        <Process />
        <Blog />
        <ContactForm /> */}
      </main>

      {/* <Footer /> */}
    </>
  );
}
