import { useState, useEffect } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import PopularSection from '../components/PopularSection';
import OpenMenuSection from '../components/OpenMenuSection';
import { Fade } from "react-awesome-reveal";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  const baseUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    let intervalId;

    const checkServer = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/ping`);
        if (response.ok) {
          setLoading(false);
          clearInterval(intervalId);
        }
      } catch (error) {
        console.log(error)
      }
    };

    checkServer();
    intervalId = setInterval(checkServer, 2000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <div className="container grow mx-auto">
          <div className="flex justify-center items-center min-h-screen">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
          </div>
        </div >
        <Footer />
      </>
    );
  }

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
