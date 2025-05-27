import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import PopularSection from '../components/PopularSection';
import OpenMenuSection from '../components/OpenMenuSection';
import { Fade } from "react-awesome-reveal";

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="container grow mx-auto">
        <Fade triggerOnce={false} duration={1000}>
          <HeroSection />
        </Fade>
        <PopularSection />
        <Fade triggerOnce={false} duration={1000}>
          <OpenMenuSection />
        </Fade>
      </div>
      <Footer />
    </>
  );
}