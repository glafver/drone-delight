import { useState, useEffect } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import PopularSection from '../components/PopularSection';
import OpenMenuSection from '../components/OpenMenuSection';
import { Fade } from "react-awesome-reveal";
import { PropagateLoader } from "react-spinners";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  const baseUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    let cancelled = false;
    let intervalId;
    const startedAt = Date.now();

    const stop = () => {
      setLoading(false);
      clearInterval(intervalId);
    };

    const checkServer = async () => {
      if (cancelled) return;

      try {
        const response = await fetch(`${baseUrl}/ping`);
        if (response.ok) {
          stop();
          return;
        }
      } catch (error) {
        console.log(error);
      }

      // Never leave the visitor on the spinner forever: if the API is still not
      // reachable after a few seconds, render the page anyway.
      if (Date.now() - startedAt > 6000) {
        stop();
      }
    };

    checkServer();
    intervalId = setInterval(checkServer, 1500);

    return () => {
      cancelled = true;
      clearInterval(intervalId);
    };
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <div className="container grow mx-auto">
            <div className='flex justify-center items-center h-[60vh]'>
              <PropagateLoader color='#a4f4cf' />
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
