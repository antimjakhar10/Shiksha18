import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0b1220] text-gray-300 pt-14 pb-6 mt-20">

      <div className="max-w-7xl mx-auto px-6">

        {/* Top Section */}
        <div className="grid md:grid-cols-3 gap-10 text-center md:text-left items-start">

          {/* LEFT */}
          <div className="md:pr-16">
            <h2 className="text-2xl font-bold text-white mb-4">
              Shiksha <span className="text-green-500">18</span>
            </h2>

            <p className="text-sm leading-6">
              Helping students choose the right college and build a brighter future.
              We simplify your admission journey step by step.
            </p>

            {/* Social Icons */}
            <div className="flex justify-center md:justify-start gap-3 mt-5">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                <div
                  key={i}
                  className="bg-gray-700 p-2 rounded-full hover:bg-green-500 transition cursor-pointer"
                >
                  <Icon size={14} />
                </div>
              ))}
            </div>
          </div>

          {/* CENTER */}
          <div className="md:px-20">
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>

            <ul className="space-y-2 text-sm">
              {[
                { name: "Home", path: "/" },
                { name: "Universities", path: "/universities" },
                { name: "Colleges", path: "/colleges" },
                { name: "Blogs", path: "/blogs" },
                { name: "Contact", path: "/contact" },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="hover:text-green-400 transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT */}
          <div className="md:pl-13">
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>

            <div className="space-y-3 text-sm">
              <p>📍 Office No. 531, Mandi, Himachal Pradesh</p>
              <p>📞 +91 9857002222</p>
              <p>📧 support@shiksha18.com</p>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-10 pt-5 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Shiksha18. All rights reserved.
        </div>

      </div>

    </footer>
  );
};

export default Footer;