import mobileImage from '../assets/hero-mobile.png';
import desktopImage from '../assets/hero-desktop.png';

export default function HeroSection() {
    return (
        <section className="pb-20">
            <img
                src={mobileImage}
                alt="Food Mobile"
                className="w-full block lg:hidden"
            />
            <img
                src={desktopImage}
                alt="Food Desktop"
                className="w-full hidden lg:block"
            />

        </section>
    );
}