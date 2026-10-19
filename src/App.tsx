
import Navbar from "./components/layout/Navbar";
import Hero from "./features/home/components/hero";
import Service from "./features/home/components/ServicesSection";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Service />
      </main>
    </>
  );
}
