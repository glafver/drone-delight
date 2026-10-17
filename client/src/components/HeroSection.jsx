import mobileImage from '../assets/hero-mobile.webp';
import desktopImage from '../assets/hero-desktop.webp';

export default function HeroSection() {
    return (
        <section className="pb-20 ">
            {/*
              <picture> lets the browser download only the image for the current
              breakpoint. With two plain <img> tags (hidden with CSS) both files were
              downloaded, which used to mean ~26 MB on the first page.
            */}
            <picture>
                <source media="(min-width: 1024px)" srcSet={desktopImage} />
                <img
                    src={mobileImage}
                    alt="Food delivered by air"
                    className="w-full rounded-lg"
                />
            </picture>
        </section>
    );
}
