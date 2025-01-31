import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Nav from '../Nav/Nav';
import './Home.css';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const navigate = useNavigate(); // Define navigate function

  const heroImages = [
    "/hero1.jpg",
    "/hero2.jpg",
    "/hero3.jpg",
    "/hero4.jpg"
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="home-container">
      <Nav />

      <motion.header 
        className="hero-section"
        style={{ backgroundImage: `url(${heroImages[currentImage]})` }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-overlay">
          <h1 data-aos="fade-down"> MINRUK VEHICLE CARE </h1>
          <p data-aos="fade-up"> Book an appointment, and our expert will come to your home to wash your vehicle</p>
          <motion.button 
            onClick={() => navigate("/adduser")} // Corrected navigation function
            className="book-now-btn"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >🚀 Book Now</motion.button>
        </div>
      </motion.header>

      <section className="why-choose-us">
        <h2 data-aos="fade-up">🔥 Why Choose Our Vehicle Care?</h2>
        <div className="why-us-grid">
          {["Eco-Friendly Solutions", "Certified Professionals", "Convenient Scheduling", "100% Customer Satisfaction"].map((benefit, index) => (
            <motion.div key={index} className="why-us-card" whileHover={{ scale: 1.1 }} data-aos="zoom-in">
              <FaCheckCircle className="check-icon" />
              <p>{benefit}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="services">
        <div className="container">
          <h2 data-aos="fade-up" className="section-title">Our Services</h2>
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            slidesPerView={1}
            spaceBetween={30}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
          >
            {[
              { img: "/customer-care.jpg", title: "24/7 Customer Support", desc: "📞 Always here to assist you." },
              { img: "/vehicle-washing.gif", title: "Expert Vehicle Washing", desc: "🚿 Deep cleaning by professionals." },
              { img: "/vehicle-cleaning.jpg", title: "Eco-Friendly Products", desc: "🌍 Safe for cars & the planet." },
              { img: "/service-agent.jpg", title: "Trusted Agents", desc: "🔍 Verified experts for premium care." }
            ].map((service, index) => (
              <SwiperSlide key={index}>
                <motion.div className="service-card" whileHover={{ scale: 1.05 }} data-aos="flip-left">
                  <div className="image-container">
                    <img src={service.img} alt={service.title} />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="cta-section">
        <h2 data-aos="zoom-in">Get Your Car Spotless Today!</h2>
        <p className="cta-description" data-aos="fade-up">
          At <strong>Minruk Vehicle Care</strong>, we specialize in premium car cleaning, detailing, and eco-friendly washing services.
          Our team of certified professionals is dedicated to providing high-quality vehicle care, ensuring your car looks brand new after every visit.
        </p>
        <div className="service-locations" data-aos="fade-up">
          <h3>📍 Available Locations</h3>
          <ul>
            <li  onClick={() => navigate("/adduser")}> Colombo</li>
            <li  onClick={() => navigate("/adduser")}> Negombo</li>
            <li  onClick={() => navigate("/adduser")}> Kaluthara</li>
            <li onClick={() => navigate("/adduser")}> Gampaha</li>
            <li  onClick={() => navigate("/adduser")}> Malabe</li>
            <li  onClick={() => navigate("/adduser")}>🌍 More cities coming soon...</li>
          </ul>
        </div>
        <p className="cta-details" data-aos="fade-up">
          Our eco-friendly products are designed to protect both your car’s finish and the environment.  
          Book an appointment now and experience <strong>hassle-free car care</strong> at <strong>your convenience</strong>!
        </p>
        <motion.button  
        onClick={() => navigate("/adduser")}
        className="cta-btn" 
        whileHover={{ scale: 1.2 }} 
        whileTap={{ scale: 0.9 }} >
          
          🚀 Book a Service
        </motion.button>
      </section>

      <motion.footer className="footer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
        <p>&copy; 2025 Minruk Vehicle Care. Your trusted car wash service.</p>
      
  <button className="styled-button" onClick={() => navigate("/log")}>
    Admin Login
  </button>

      </motion.footer>
    </div>
  );
}

export default Home;
