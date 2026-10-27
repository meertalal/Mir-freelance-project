import Navbar from "./components/layout/Navbar";
import Hero from "./features/home/components/home/hero";
import Service from "./features/home/components/service/ServicesSection";
import Works from "./features/home/components/Works/FeaturedWork";
import WhyWithUs from "./features/home/components/why-work-with-me/WhyWorkWithMe";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Service />
        <Works />
        <WhyWithUs />
      </main>
    </>
  );
}
