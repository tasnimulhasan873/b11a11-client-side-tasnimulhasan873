import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-200 text-green-800 py-10 px-4 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Contact Info */}
        <div>
          <h3 className="font-bold text-xl mb-3">Contact Us</h3>
          <p className="mb-1">Email: tasnimul873@gmail.com</p>
          <p className="mb-1">Phone: +123 456 7890</p>
          <p>Address: Dhaka, Bangladesh</p>
        </div>

        {/* Legal Links */}
        <div>
          <h3 className="font-bold text-xl mb-3">Legal</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Return Policy</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="font-bold text-xl mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-6 text-2xl">
            <a href="#" aria-label="Facebook" className="hover:text-green-600"><FaFacebookF /></a>
            <a href="#" aria-label="Instagram" className="hover:text-green-600"><FaInstagram /></a>
            <a href="#" aria-label="Twitter" className="hover:text-green-600"><FaTwitter /></a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-sm mt-10 text-green-700">
        © {new Date().getFullYear()} Food Sharing. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
