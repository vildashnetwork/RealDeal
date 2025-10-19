// import { Link, useLocation } from 'react-router-dom';
// import { ShoppingCart, User, Menu, Fish } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { useCart } from '@/contexts/CartContext';
// import { useAuth } from '@/contexts/AuthContext';
// import { Badge } from '@/components/ui/badge';
// import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

// const Navbar = () => {
//   const { cartItemCount } = useCart();
//   const { isAuthenticated } = useAuth();
//   const location = useLocation();

//   const navLinks = [
//     { to: '/', label: 'Home' },
//     { to: '/products', label: 'Shop' },
//     { to: '/about', label: 'About' }
//   ];

//   const isActive = (path: string) => location.pathname === path;

//   const NavLinks = ({ mobile = false }) => (
//     <>
//       {navLinks.map((link) => (
//         <Link
//           key={link.to}
//           to={link.to}
//           className={`${
//             isActive(link.to)
//               ? 'text-primary font-medium'
//               : 'text-foreground hover:text-primary'
//           } transition-colors ${mobile ? 'block py-2' : ''}`}
//         >
//           {link.label}
//         </Link>
//       ))}
//     </>
//   );

//   return (
//     <nav className="sticky top-0 z-50 bg-card shadow-soft border-b border-border">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl">
//             <Fish className="h-6 w-6" />
//             <span>ReelDeal</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-8">
//             <NavLinks />
//           </div>

//           {/* Right Actions */}
//           <div className="flex items-center gap-4">
//             <Link to="/cart" className="relative">
//               <Button variant="ghost" size="icon">
//                 <ShoppingCart className="h-5 w-5" />
//                 {cartItemCount > 0 && (
//                   <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-cta text-cta-foreground">
//                     {cartItemCount}
//                   </Badge>
//                 )}
//               </Button>
//             </Link>

//             <Link to={isAuthenticated ? "/profile" : "/auth"}>
//               <Button variant="ghost" size="icon">
//                 <User className="h-5 w-5" />
//               </Button>
//             </Link>

//             {/* Mobile Menu */}
//             <Sheet>
//               <SheetTrigger asChild className="md:hidden">
//                 <Button variant="ghost" size="icon">
//                   <Menu className="h-5 w-5" />
//                 </Button>
//               </SheetTrigger>
//               <SheetContent side="right" className="w-64">
//                 <div className="flex flex-col gap-4 mt-8">
//                   <NavLinks mobile />
//                 </div>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;














import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Menu, Fish } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const { cart, loading } = useCart(); // fetch cart from context
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Compute cart item count from backend
  const cartItemCount = cart.length;
  // reduce((sum, item) => sum + (item.StockQuantity || 0), 0);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Shop" },
    { to: "/about", label: "About" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={`${isActive(link.to)
            ? "text-primary font-medium"
            : "text-foreground hover:text-primary"
            } transition-colors ${mobile ? "block py-2" : ""}`}
        >
          {link.label}
        </Link>
      ))}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-card shadow-soft border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-primary font-bold text-xl"
          >
            <Fish className="h-6 w-6" />
            <span>ReelDeal</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLinks />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Cart Button */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {!loading && cartItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-cta text-cta-foreground">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Profile / Auth */}
            <Link to={isAuthenticated ? "/profile" : "/auth"}>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col gap-4 mt-8">
                  <NavLinks mobile />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
