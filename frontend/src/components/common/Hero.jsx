import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    '/src/assets/images/12.jpg',
    '/src/assets/images/13.jpg',
    '/src/assets/images/14.jpg'
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen min-h-[800px] overflow-hidden">
      {/* Animated Background Slider */}
      <div className="absolute inset-0 z-0">
        {images.map((img, index) => (
          <motion.img
            key={img}
            src={img}
            alt="Luxury home"
            className="absolute inset-0 object-cover w-full h-full"
            initial={{ opacity: 0 }}
            animate={{
              opacity: currentImage === index ? 1 : 0,
              scale: currentImage === index ? 1 : 1.1
            }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 mx-auto text-center max-w-7xl">
        {/* Animated Text Content */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl space-y-8"
        >
          <h1 className="text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl drop-shadow-2xl">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Discover
            </span>{' '}
            Your Dream Residence
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl text-gray-200 md:text-2xl font-light"
          >
            Experience luxury living through our curated collection of premium properties
          </motion.p>
        </motion.div>

        {/* Enhanced Scrolling Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center space-y-4">
            <span className="text-sm font-medium text-white/80">Explore More</span>
            <div className="relative w-8 h-14">
              <div className="absolute inset-0 border-2 border-white/50 rounded-full animate-pulse"></div>
              <div className="absolute top-2 left-1/2 w-1 h-4 bg-white/80 rounded-full animate-scroll"></div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent z-20" />
    </section>
  );
};

export default Hero;