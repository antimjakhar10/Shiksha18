import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-gray-300 pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">

        {/* Logo & About */}
        <div>
          <Link to="/">
            <h2 className="text-2xl font-bold text-white mb-4">
              Shiksha <span className="text-green-500">18</span>
            </h2>
          </Link>

          <p className="text-sm leading-6">
            Helping students choose the right college and build a brighter future.
            We simplify your admission journey step by step.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            <div className="bg-gray-700 p-2 rounded-full hover:bg-green-500 transition cursor-pointer">
              <FaFacebookF size={14} />
            </div>
            <div className="bg-gray-700 p-2 rounded-full hover:bg-green-500 transition cursor-pointer">
              <FaTwitter size={14} />
            </div>
            <div className="bg-gray-700 p-2 rounded-full hover:bg-green-500 transition cursor-pointer">
              <FaInstagram size={14} />
            </div>
            <div className="bg-gray-700 p-2 rounded-full hover:bg-green-500 transition cursor-pointer">
              <FaLinkedinIn size={14} />
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">

            <li>
              <Link to="/" className="hover:text-green-400">
                Home
              </Link>
            </li>

            <li>
              <Link to="/universities" className="hover:text-green-400">
                Universities
              </Link>
            </li>

            <li>
              <Link to="/courses" className="hover:text-green-400">
                Courses
              </Link>
            </li>

            <li>
              <Link to="/exams" className="hover:text-green-400">
                Exams
              </Link>
            </li>

            <li>
              <Link to="/contact" className="hover:text-green-400">
                Contact
              </Link>
            </li>

          </ul>
        </div>

        {/* Top Streams */}
        <div>
          <h3 className="text-white font-semibold mb-4">Top Streams</h3>
          <ul className="space-y-2 text-sm">

            <li>
              <Link
                to="/universities?stream=engineering"
                className="hover:text-green-400"
              >
                Engineering
              </Link>
            </li>

            <li>
              <Link
                to="/universities?stream=management"
                className="hover:text-green-400"
              >
                Management
              </Link>
            </li>

            <li>
              <Link
                to="/universities?stream=medical"
                className="hover:text-green-400"
              >
                Medical
              </Link>
            </li>

            <li>
              <Link
                to="/universities?stream=law"
                className="hover:text-green-400"
              >
                Law
              </Link>
            </li>

            <li>
              <Link
                to="/universities?stream=design"
                className="hover:text-green-400"
              >
                Design
              </Link>
            </li>

          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Us</h3>
          <p className="text-sm mb-2">📍 Office N0. 531, Mandi, Himachal Pradesh</p>
          <p className="text-sm mb-2">📞 +91 9857002222</p>
          <p className="text-sm">📧 support@shiksha18.com</p>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Shiksha18. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;