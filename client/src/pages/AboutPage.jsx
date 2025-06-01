import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import user from '../assets/user.png'
import { Fade } from "react-awesome-reveal";

const AboutPage = () => {
    return (
        <>
            <Header />
            <div className="container grow mx-auto px-8 lg:px-4 py-10">
                <Fade>
                <h1 className="text-4xl font-gluten text-amber-500 font-bold mb-10 text-center">About us</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div className="space-y-6">
                        <section className="space-y-1">
                            <h2 className="text-2xl font-semibold">Revolutionizing Food Delivery</h2>
                            <p className="text-lg leading-relaxed">
                                Drone Delight is not just another delivery app — we’re bringing the future to your doorstep.
                                Our fully electric drones deliver hot meals from your favorite local restaurants, faster and more efficiently than traditional methods.
                            </p>
                        </section>

                        <section className="space-y-1">
                            <h2 className="text-2xl font-semibold">Why Drones?</h2>
                            <p className="text-lg leading-relaxed">
                                Traffic delays and long wait times are a thing of the past. With our autonomous drones, your food travels through the air — not the streets — reducing emissions and cutting down delivery times significantly.
                            </p>
                        </section>

                        <section className="space-y-1">
                            <h2 className="text-2xl font-semibold">How It Works</h2>
                            <p className="text-lg leading-relaxed">
                                Simply place your order through our app, and one of our drones will fly it straight from the restaurant to your delivery point.
                                With real-time tracking and safe drop-off zones, Drone Delight makes fast food feel futuristic.
                            </p>
                        </section>

                        <section className="space-y-1">
                            <h2 className="text-2xl font-semibold">Our Mission</h2>
                            <p className="text-lg leading-relaxed">
                                We aim to make food delivery faster, greener, and more exciting.
                                By using drones, we reduce carbon footprints and support eco-friendly logistics — without sacrificing speed or taste.
                            </p>
                        </section>
                    </div>
                    <div className="">
                        <img
                            src={user}
                            alt="Happy user receiving food from drone"
                            className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                        />
                    </div>
                </div>
                <div className="text-center mt-12">
                    <p className="text-3xl text-emerald-500">
                        Drone Delight — taste the future, delivered by air.
                    </p>
                </div>
                </Fade>
            </div>
            <Footer />
        </>
    )
}

export default AboutPage
