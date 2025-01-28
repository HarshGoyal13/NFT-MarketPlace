import React from 'react';
import TechStack from '../components/TechStack';
import About from '../components/About';

const Home = () => {
  return (
    <div className="text-white font-sans">

      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center bg-cover bg-center relative" 
        style={{ backgroundImage: 'url(https://via.placeholder.com/1500x1000)' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-blue-900 opacity-60"></div>
        <div className="z-10 text-center p-6 sm:p-12 md:p-16">
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold text-white mb-4 text-shadow-lg animate__animated animate__fadeInUp">
            Welcome to Our NFT Collection
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 tracking-wider leading-relaxed animate__animated animate__fadeInUp animate__delay-1s">
            Explore unique digital artwork, available for sale and trade. Dive into the world of NFTs and unlock endless possibilities!
          </p>
          <button className="bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-700 hover:to-pink-800 py-3 px-10 rounded-xl text-xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl animate__animated animate__fadeInUp animate__delay-2s">
            Browse NFTs
          </button>
        </div>
      </section>

    <TechStack/>

    <About/>


    </div>
  );
};

export default Home;
