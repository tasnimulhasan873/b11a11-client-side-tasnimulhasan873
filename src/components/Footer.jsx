import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-yellow-50 via-yellow-100 to-yellow-50 text-orange-800 py-12 px-6 font-sans shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-x-12 gap-y-8 text-center md:text-left">

        {/* Contact Info */}
        <div className="flex-1 min-w-[220px] mr-28">
          <h3 className="font-extrabold text-2xl mb-4 border-b-4 border-orange-400 inline-block pb-1">
            Contact Us
          </h3>
          <p className="mb-2 font-semibold">
            Email: <a href="mailto:tasnimul873@gmail.com" className="text-orange-600 hover:underline">tasnimul873@gmail.com</a>
          </p>
          <p className="mb-2 font-semibold">
            Phone: <a href="tel:+1234567890" className="text-orange-600 hover:underline">+123 456 7890</a>
          </p>
          <p className="italic">Dhaka, Bangladesh</p>
        </div>

        {/* Legal Links */}
        <div className="flex-1 min-w-[220px] mr-15">
          <h3 className="font-extrabold text-2xl mb-4 border-b-4 border-orange-400 inline-block pb-1">
            Legal
          </h3>
          <ul className="space-y-3">
            <li>
              <a href="#" className="text-orange-700 hover:text-orange-500 transition font-medium">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="text-orange-700 hover:text-orange-500 transition font-medium">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-orange-700 hover:text-orange-500 transition font-medium">
                Return Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="flex-1 min-w-[220px]">
          <h3 className="font-extrabold text-2xl mb-4 border-b-4 border-orange-400 inline-block pb-1">
            Follow Us
          </h3>
          <div className="flex justify-center md:justify-start gap-8 text-orange-600 text-3xl">
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-orange-500 transition transform hover:scale-110 rounded-full p-2 bg-yellow-200 shadow-md"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-orange-500 transition transform hover:scale-110 rounded-full p-2 bg-yellow-200 shadow-md"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-orange-500 transition transform hover:scale-110 rounded-full p-2 bg-yellow-200 shadow-md"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-sm mt-12 text-orange-600 font-semibold tracking-wide select-none">
        © {new Date().getFullYear()} Food Sharing. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
