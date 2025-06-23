
import { Users, Gift } from "lucide-react";
import logo from "/assets/images/logo.png";

const Footer = () => {
  const year = new Date();
  const currentYear = year.getFullYear();
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 via-black to-green-500 rounded-xl mr-4">
                <img src={logo} />
              </div>
              <h3 className="text-2xl font-bold">Givers</h3>
            </div>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Building communities through the simple act of giving and receiving. 
              Join thousands of people who are making a difference, one item at a time.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Users className="w-4 h-4" />
                <span>10,000+ Members</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Gift className="w-4 h-4" />
                <span>5,000+ Items Shared</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">How It Works</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Browse Items</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Share an Item</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Community Guidelines</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Safety Tips</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} Givers. Made with ❤️ for communities everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;