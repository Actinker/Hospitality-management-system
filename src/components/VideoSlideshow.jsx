import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

function VideoSlideshow() {
  const videos = [
    {
      src: '/assets/videos/video1.mp4',
      alt: 'Hotel Lobby',
      title: 'Elegant Lobby',
      description: 'A warm welcome awaits in our grand reception area'
    },
    {
      src: '/assets/videos/video2.mp4',
      alt: 'Deluxe Room',
      title: 'Luxury Accommodations',
      description: 'Unwind in our spacious and well-appointed rooms'
    },
    {
      src: '/assets/videos/video3.mp4',
      alt: 'Restaurant View',
      title: 'Fine Dining Experience',
      description: 'Savor exquisite cuisine with breathtaking views'
    },
    // Add more videos as needed
  ];

  return (
    <div className="relative h-screen">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        effect="fade"
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ 
          clickable: true, 
          dynamicBullets: true,
          renderBullet: function (index, className) {
            return `<span class="${className} w-3 h-3 bg-white bg-opacity-70 rounded-full transition-all duration-300"></span>`;
          }
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        className="h-full"
        aria-label="Video Slideshow"
      >
        {videos.map((video, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full overflow-hidden">
              <video
                src={video.src}
                className="w-full h-full object-cover scale-105"
                autoPlay
                muted
                loop
                playsInline
                aria-label={video.alt}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70">
                <div className="absolute inset-0 bg-black/30"></div>
              </div>
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-6 md:px-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-center max-w-4xl"
                >
                  <span className="block mb-3 text-sm md:text-base font-medium tracking-wider text-indigo-300">
                    EXPERIENCE LUXURY
                  </span>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
                    Welcome to <span className="text-indigo-400">Continental Suite</span>
                  </h1>
                  <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-200">
                    Experience luxury and comfort in the heart of the city. Where every moment is crafted for your pleasure.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="/rooms"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-md transition duration-300 shadow-lg"
                      aria-label="Book Now"
                    >
                      Book Your Stay
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="/about"
                      className="border-2 border-white hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-md transition duration-300"
                      aria-label="Explore More"
                    >
                      Explore More
                    </motion.a>
                  </div>
                </motion.div>
              </div>
              
              {/* Video Title */}
              <div className="absolute bottom-14 left-6 md:left-12">
                <span className="inline-block text-xs md:text-sm text-gray-300 font-medium bg-black/50 px-3 py-1 rounded-md">
                  {video.title}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom Navigation Buttons */}
      <div className="swiper-button-prev !w-12 !h-12 !text-white !bg-black/30 hover:!bg-indigo-700/70 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 !left-4"></div>
      <div className="swiper-button-next !w-12 !h-12 !text-white !bg-black/30 hover:!bg-indigo-700/70 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 !right-4"></div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce hidden md:flex">
        <span className="text-white text-xs mb-1">Scroll Down</span>
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
}

export default VideoSlideshow;