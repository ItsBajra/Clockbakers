import React from 'react';
import Header from './Home/Header';
import Navbar from '../components/navbar';
import row1image from '../assets/cakeRow/cake-row-1.png';
import row2image from '../assets/cakeRow/cake-row-2.png';
import row3image from '../assets/cakeRow/cake-row-3.png';
import bgPattern from '../assets/Bgpattern.png';
import cakepresentation from '../assets/cake-presentation.png';
import signupicon from '../assets/icons/signup.png';
import browse from '../assets/icons/browse.png';
import payment from '../assets/icons/payment.png';
import devlivery from '../assets/icons/delivery.png';
import Footer from '../components/Footer';

const AboutPage = () => {
    return (
        <div className="relative overflow-x-hidden">
            <Navbar />
            <Header />

            {/* Header Text */}
            <div className="relative w-full text-center mt-8 md:mt-12 lg:mt-40 px-4">
                <div className="inline-block">
                    <p className="font-bold text-2xl md:text-3xl lg:text-4xl" style={{ fontFamily: "'Kalam', cursive" }}>
                        <span className="text-[#050706] block md:inline">
                            Enjoy fresh items of our{" "}
                        </span>
                        <span className="text-[#f74781] mt-2 md:mt-0 block">
                            Clock Bakers{" "}
                        </span>
                    </p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mt-3 md:mt-15 lg:mt-[-80px] px-4">
                {[row1image, row3image, row2image].map((img, index) => (
                    <div
                        key={index}
                        className={`w-full max-w-xs md:w-48 lg:w-64 xl:w-80 h-48 md:h-64 lg:h-96 xl:h-[400px] group relative overflow-hidden bg-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300
                            ${index === 1 ? 'md:mt-40 lg:mt-60' : ''}`}
                    >
                        <img
                            src={img}
                            alt="Clock Bakers"
                            className="w-full h-full object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-300 shadow-xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl" />
                    </div>
                ))}
            </div>

            <div className="relative flex flex-col items-center py-10 md:py-16 lg:py-20 px-4 md:px-8 mt-12 md:mt-24 lg:mt-32 bg-cover bg-center bg-no-repeat min-h-[500px] md:min-h-[650px]"
                style={{ backgroundImage: `url(${bgPattern})` }}>
                <div className="max-w-2xl text-center">
                    <p className="text-lg md:text-xl lg:text-2xl font-semibold" style={{ fontFamily: "'Kalam', cursive" }}>
                        <span className="text-[#204B6F]">
                            Introducing the best cake ever known{" "}
                        </span>
                        <span className="text-[#fc85ff]">
                            TO YOU
                        </span>
                        <br /><br />
                        <span className="text-[#fc98fc]">CLOCKBAKERS</span>
                        <span className="text-[#050706]">
                            {" "}has taken over the city of Kathmandu.
                        </span>
                    </p>
                </div>

                <div className="relative flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mt-8 md:mt-28 lg:mt-35 px-4 md:px-8 pb-16">
                    <div className="flex flex-col items-center justify-center text-center max-w-md lg:max-w-xl md:mr-8 lg:mr-25">
                        <h2 className="text-3xl md:text-4xl px-10 lg:text-6xl font-bold text-[#f74781] mb-4" style={{ fontFamily: "'Kalam', cursive" }}>
                            Clock Bakers
                        </h2>
                        <p className="text-lg md:text-xl lg:text-2xl text-[#050706] mb-6" style={{ fontFamily: "'Kalam', cursive" }}>
                            Our business service for you
                        </p>

                        <div className="flex flex-col items-center justify-center space-y-4 md:space-y-6">
                            {['Custom Cakes & Pastries', 'Daily Fresh Bakes', 'Online Orders & Delivery'].map((item, index) => (
                                <p key={index} className="text-base md:text-lg text-[#f74781]" style={{ fontFamily: "'Kalam', cursive" }}>
                                    {item}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
                        <div className="relative w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 md:ml-8 lg:ml-20">
                            <img
                                className="w-full h-full object-cover rounded-full"
                                alt="Rectangle"
                                src={row2image}
                            />
                        </div>

                        <div className="relative w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 md:ml-8 lg:ml-30">
                            <img
                                className="w-full h-full object-cover rounded-full"
                                alt="Rectangle"
                                src={row1image}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-row items-start gap-8 p-8 mt-8 md:mt-25">
                <div className="flex flex-col items-center justify-center text-center w-full md:mr-25">
                    <div className="relative mb-8 md:mb-12">
                        <div className="relative">
                            <div className="text-xl md:text-2xl lg:text-3xl font-bold [font-family:'Kalam-Regular'] text-[#050706] tracking-[1.92px] mb-4">
                                How our Business Work
                            </div>
                            <div className="text-xl md:text-2xl text-[#f74781] mt-4">
                                How It Works
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative container mx-auto px-4 md:px-8 mb-30">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                    {/* Image Container */}
                    <div className="w-full lg:w-1/2 flex justify-center">
                        <div className="w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden bg-pink-600 shadow-2xl relative z-10">
                            <img
                                src={cakepresentation}
                                alt="Illustration"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Steps Container */}
                    <div className="w-full lg:w-1/2 ">
                        <div className="space-y-6 md:space-y-10 lg:pl-8 xl:pl-16">
                            <div className="flex items-start gap-4 md:gap-6 group">
                                <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-gray-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <img className="w-5 h-5 md:w-6 md:h-6 object-contain filter brightness-0 invert" alt="Sign Up" src={signupicon} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base md:text-lg font-semibold text-gray-900">Sign Up</h3>
                                    <p className="text-sm md:text-base text-gray-600">Create your account in seconds and start your journey with us.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 md:gap-6 group">
                                <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-gray-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <img className="w-5 h-5 md:w-6 md:h-6 object-contain filter brightness-0 invert" alt="PaymeBrowse" src={browse} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base md:text-lg font-semibold text-gray-900">Browse & Explore</h3>
                                    <p className="text-sm md:text-base text-gray-600">Discover a wide range of products tailored to your needs.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 md:gap-6 group">
                                <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-gray-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <img className="w-6 h-6 md:w-8 md:h-8 object-contain filter brightness-0 invert" alt="Payment" src={payment} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base md:text-lg font-semibold text-gray-900">Secure Payment</h3>
                                    <p className="text-sm md:text-base text-gray-600">Enjoy safe, quick, and hassle-free payment options.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 md:gap-6 group">
                                <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-gray-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <img className="w-6 h-6 md:w-8 md:h-8 object-contain filter brightness-0 invert" alt="Delivery" src={devlivery} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base md:text-lg font-semibold text-gray-900">Fast Delivery</h3>
                                    <p className="text-sm md:text-base text-gray-600">Get orders delivered swiftly and securely to your doorstep.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default AboutPage;
