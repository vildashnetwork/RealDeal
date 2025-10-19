import { Link } from 'react-router-dom';
import { Fish, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Fish className="h-6 w-6" />
              <span className="font-bold text-xl">ReelDeal</span>
            </div>
            <p className="text-sm opacity-90">
              Your trusted source for premium fishing equipment and gear.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:underline opacity-90">Home</Link></li>
              <li><Link to="/products" className="hover:underline opacity-90">Shop</Link></li>
              <li><Link to="/about" className="hover:underline opacity-90">About Us</Link></li>
              <li><Link to="/cart" className="hover:underline opacity-90">Cart</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products?category=Rods & Reels" className="hover:underline opacity-90">Rods & Reels</Link></li>
              <li><Link to="/products?category=Lures & Baits" className="hover:underline opacity-90">Lures & Baits</Link></li>
              <li><Link to="/products?category=Tackle & Gear" className="hover:underline opacity-90">Tackle & Gear</Link></li>
              <li><Link to="/products?category=Apparel" className="hover:underline opacity-90">Apparel</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 opacity-90">
                <Mail className="h-4 w-4" />
                <span>info@reeldeal.com</span>
              </li>
              <li className="flex items-center gap-2 opacity-90">
                <Phone className="h-4 w-4" />
                <span>1-800-FISHING</span>
              </li>
              <li className="flex items-center gap-2 opacity-90">
                <MapPin className="h-4 w-4" />
                <span>123 Harbor St, Coastal City</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-90">
          <p>&copy; {new Date().getFullYear()} ReelDeal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
