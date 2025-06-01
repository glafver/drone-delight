import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { Fade } from "react-awesome-reveal";

const ContactsPage = () => {
    return (
        <>
            <Header />
            <div className="container grow mx-auto px-8 lg:px-4 py-10">
                <Fade>
                    <h1 className="text-4xl font-gluten text-amber-500 font-bold mb-10 text-center">Contact us</h1>
                    <div className="max-w-4xl mx-auto">

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            <div>
                                <form className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block font-medium">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block font-medium">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block font-medium">Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={5}
                                            className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-400 transition"
                                        >
                                            Send Message
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <ul className="mt-4 space-y-1">
                                        <li><strong>Address:</strong> Exempelgatan 12, 211 00 Malmö</li>
                                        <li><strong>Phone:</strong> +46 70 123 45 67</li>
                                        <li><strong>Email:</strong> info@example.se</li>
                                    </ul>
                                </div>

                                <div>
                                    <div className=" flex text-amber-500 text-xl">
                                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 text-lg">
                                            <FaFacebookF />
                                        </a>
                                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 me-1">
                                            <FaInstagram />
                                        </a>
                                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400">
                                            <FaLinkedinIn />
                                        </a>
                                    </div>
                                </div>

                                <div>
                                    <div className="mt-2 rounded-lg overflow-hidden shadow-lg">
                                        <iframe
                                            src="https://maps.google.com/maps?q=malmö&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                            className="w-full h-64 border-0"
                                            allowFullScreen
                                            loading="lazy"
                                            title="Google Maps"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </Fade>
            </div>
            <Footer />
        </>
    )
}

export default ContactsPage
