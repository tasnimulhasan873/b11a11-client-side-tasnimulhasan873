import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-t from-yellow-50 via-orange-50 to-yellow-50 text-orange-800 py-12 px-6 font-sans shadow-inner"> {/* Changed to yellow/orange gradient */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 text-center md:text-left">

        {/* Brand Info / Logo Section */}
        <div className="flex flex-col items-center md:items-start lg:col-span-1">
          <h2 className="font-extrabold text-3xl mb-4 text-orange-700"> {/* Changed to orange-700 */}
            Food<span className="text-green-600">Share</span> {/* Kept green for accent */}
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Connecting communities, reducing waste. Share, request, and enjoy surplus food.
          </p>
          <div className="flex justify-center md:justify-start gap-4 text-orange-600 text-2xl mt-4"> {/* Changed to orange-600 */}
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-orange-500 transition-colors duration-300 transform hover:scale-110 rounded-full p-2 bg-yellow-200 shadow-md" // Changed to yellow-200
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-orange-500 transition-colors duration-300 transform hover:scale-110 rounded-full p-2 bg-yellow-200 shadow-md" // Changed to yellow-200
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-orange-500 transition-colors duration-300 transform hover:scale-110 rounded-full p-2 bg-yellow-200 shadow-md" // Changed to yellow-200
            >
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-start lg:col-span-1">
          <h3 className="font-extrabold text-2xl mb-4 border-b-4 border-orange-400 inline-block pb-1 text-orange-700"> {/* Changed to orange-400 and orange-700 */}
            Contact Us
          </h3>
          <p className="mb-2 font-semibold">
            Email: <a href="mailto:tasnimul873@gmail.com" className="text-orange-600 hover:underline">tasnimul873@gmail.com</a> {/* Changed to orange-600 */}
          </p>
          <p className="mb-2 font-semibold">
            Phone: <a href="tel:+1234567890" className="text-orange-600 hover:underline">+123 456 7890</a> {/* Changed to orange-600 */}
          </p>
          <p className="italic text-gray-600">Dhaka, Bangladesh</p>
        </div>

        {/* Legal Links */}
        <div className="flex flex-col items-center md:items-start lg:col-span-1">
          <h3 className="font-extrabold text-2xl mb-4 border-b-4 border-orange-400 inline-block pb-1 text-orange-700"> {/* Changed to orange-400 and orange-700 */}
            Legal
          </h3>
          <ul className="space-y-3">
            <li>
              <a href="#" className="text-orange-700 hover:text-orange-500 transition-colors duration-300 font-medium"> {/* Changed to orange-700 */}
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="text-orange-700 hover:text-orange-500 transition-colors duration-300 font-medium"> {/* Changed to orange-700 */}
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-orange-700 hover:text-orange-500 transition-colors duration-300 font-medium"> {/* Changed to orange-700 */}
                Return Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links / Navigation */}
        <div className="flex flex-col items-center md:items-start lg:col-span-1">
          <h3 className="font-extrabold text-2xl mb-4 border-b-4 border-orange-400 inline-block pb-1 text-orange-700"> {/* Changed to orange-400 and orange-700 */}
            Quick Links
          </h3>
          <ul className="space-y-3">
            <li>
              <a href="/" className="text-orange-700 hover:text-orange-500 transition-colors duration-300 font-medium"> {/* Changed to orange-700 */}
                Home
              </a>
            </li>
            <li>
              <a href="/available-foods" className="text-orange-700 hover:text-orange-500 transition-colors duration-300 font-medium"> {/* Changed to orange-700 */}
                Available Foods
              </a>
            </li>
            
            {/* Add more links as needed, e.g., /manage-foods, /my-requests */}
          </ul>
        </div>

      </div>

      {/* Bottom line */}
      <div className="border-t border-orange-200 pt-8 mt-12 text-center text-sm text-orange-600 font-semibold tracking-wide select-none"> {/* Changed to orange-200 and orange-600 */}
        © {currentYear} Food Sharing. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;