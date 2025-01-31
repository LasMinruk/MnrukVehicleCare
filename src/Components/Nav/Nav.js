import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import "./Nav.css"; // Import external CSS file

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const linkVariants = {
  hover: { scale: 1.1 },
  tap: { scale: 0.95 }
};

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update state when screen resizes
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.nav className="nav-container" initial="hidden" animate="visible" variants={navVariants}>
      
      {/* Left Side: Clickable Company Name (Links to Home) */}
      <div className="nav-left">
        <Link to="/mainhome" className="company-link">
          <h1 className="company-name">Minruk Vehicle Care</h1>
        </Link>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X className="menu-icon-btn" /> : <Menu className="menu-icon-btn" />}
      </div>

      {/* Navigation Links */}
      <AnimatePresence>
        {(menuOpen || !isMobile) && (
          <motion.ul 
            className={`home-ul ${menuOpen ? "mobile-menu" : ""}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {[  
              { path: "/mainhome", label: "Home" },
              { path: "/adduser", label: "Booking Form" },
              // { path: "/userdetails", label: "User Details" },
              // { path: "/regi", label: "Register" },
              // { path: "/log", label: "Login" }
            ].map((item, index) => (
              <motion.li 
                key={index} 
                className={`home-ll ${location.pathname === item.path ? "active-link" : ""}`} 
                variants={linkVariants} 
                whileHover="hover" 
                whileTap="tap"
                onClick={() => setMenuOpen(false)}
              >
                <Link to={item.path} className="home-a">
                  <h1>{item.label}</h1>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Nav;
