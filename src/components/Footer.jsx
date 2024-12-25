import React from 'react';
import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';
import { Link } from 'react-scroll';

const Footer = () => {
  return (
    <footer id="footer" className="bg-transparent text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-22">
          
          {/* About Section */}
          <div className="sm:col-span-1">
            <h4 className="text-lg font-semibold mb-4">About</h4>
            <p className="text-sm font-space">
            As an aspiring QA professional, I compiled this list of AI tools to explore the best resources in quality assurance and software testing. Please note that the top picks are based on personal opinion and may be subjective. The information provided may contain inaccuracies, so users are encouraged to verify all details independently.
            </p>
          </div>

          <div className="sm:col-span-1">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="home"
                  smooth={true}
                  duration={500}
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="aitools"
                  smooth={true}
                  duration={500}
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  AI Tools
                </Link>
              </li>
              <li>
                <Link
                  to="highlights"
                  smooth={true}
                  duration={500}
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  Highlights
                </Link>
              </li>
              <li>
                <a
                  href="https://quiza-qa.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  QA Quiz
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information Section */}
          <div className="sm:col-span-1">
            <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
            <p className="text-sm mb-4">Email: <a href="mailto:digilabsrs@gmail.com" className="text-gray-400 hover:text-white">digilabsrs@gmail.com</a></p>
            <p className="text-sm mb-4">Address: Sofia, Bulgaria</p>
            <div className="flex gap-4 mt-4 justify-center sm:justify-start">
              <a href="https://github.com/torbalansky" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-400 hover:text-white">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/srstathis/" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-400 hover:text-white">
                <FaLinkedin />
              </a>
              <a href="https://portfoliopaco.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-400 hover:text-white">
                <FaGlobe />
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
