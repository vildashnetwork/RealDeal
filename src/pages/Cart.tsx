// import { Link } from 'react-router-dom';
// import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { useCart } from '@/contexts/CartContext';
// import productRod from '@/assets/product-rod.jpg';
// import productLures from '@/assets/product-lures.jpg';
// import productTackle from '@/assets/product-tackle.jpg';
// import productApparel from '@/assets/product-apparel.jpg';

// const imageMap: Record<string, string> = {
//   'product-rod': productRod,
//   'product-lures': productLures,
//   'product-tackle': productTackle,
//   'product-apparel': productApparel
// };

// const Cart = () => {
//   const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

//   if (cart.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
//           <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
//           <p className="text-muted-foreground mb-6">Add some items to get started!</p>
//           <Link to="/products">
//             <Button className="bg-cta hover:bg-cta/90 text-cta-foreground">
//               Continue Shopping
//             </Button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen py-12">
//       <div className="container mx-auto px-4">
//         <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Cart Items */}
//           <div className="lg:col-span-2 space-y-4">
//             {cart.map((item) => (
//               <Card key={item.product.id}>
//                 <CardContent className="p-6">
//                   <div className="flex gap-6">
//                     <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted shrink-0">
//                       <img
//                         src={imageMap[item.product.image]}
//                         alt={item.product.name}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>

//                     <div className="flex-1">
//                       <div className="flex justify-between items-start mb-2">
//                         <div>
//                           <h3 className="font-semibold text-lg">{item.product.name}</h3>
//                           <p className="text-sm text-muted-foreground">{item.product.category}</p>
//                         </div>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => removeFromCart(item.product.id)}
//                           className="text-destructive hover:text-destructive"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </div>

//                       <div className="flex items-center justify-between mt-4">
//                         <div className="flex items-center border border-border rounded-lg">
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
//                           >
//                             <Minus className="h-4 w-4" />
//                           </Button>
//                           <span className="px-4 font-semibold">{item.quantity}</span>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
//                           >
//                             <Plus className="h-4 w-4" />
//                           </Button>
//                         </div>

//                         <p className="text-xl font-bold text-primary">
//                           ${(item.product.price * item.quantity).toFixed(2)}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {/* Order Summary */}
//           <div className="lg:col-span-1">
//             <Card className="sticky top-20">
//               <CardContent className="p-6">
//                 <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

//                 <div className="space-y-3 mb-6">
//                   <div className="flex justify-between">
//                     <span className="text-muted-foreground">Subtotal</span>
//                     <span className="font-semibold">${cartTotal.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-muted-foreground">Shipping</span>
//                     <span className="font-semibold">
//                       {cartTotal > 50 ? 'FREE' : '$9.99'}
//                     </span>
//                   </div>
//                   <div className="border-t pt-3 flex justify-between text-lg">
//                     <span className="font-bold">Total</span>
//                     <span className="font-bold text-primary">
//                       ${(cartTotal + (cartTotal > 50 ? 0 : 9.99)).toFixed(2)}
//                     </span>
//                   </div>
//                 </div>

//                 <Link to="/checkout">
//                   <Button className="w-full bg-cta hover:bg-cta/90 text-cta-foreground" size="lg">
//                     Proceed to Checkout
//                   </Button>
//                 </Link>

//                 <Link to="/products">
//                   <Button variant="outline" className="w-full mt-3">
//                     Continue Shopping
//                   </Button>
//                 </Link>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;













import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
  const { cart, addToCart, removeFromCart, updateQuantity, cartTotal, loading } = useCart();

  if (loading)
    return <div className="p-8 text-center">Loading your cart...</div>;

  if (cart.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <ShoppingBag className="h-24 w-24 text-muted-foreground" />
        <p className="text-xl text-muted-foreground">Your cart is empty.</p>
        <Link to="/products">
          <Button className="bg-cta hover:bg-cta/90 text-cta-foreground">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item._id}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted shrink-0">
                      <img
                        src={item.img3}
                        alt={item.ProductName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{item.ProductName}</h3>
                          <p className="text-sm text-muted-foreground">{item.Category}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item._id!)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-border rounded-lg">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(item._id!, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="px-4 font-semibold">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(item._id!, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <p className="text-xl font-bold text-primary">
                          ${(item.Price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-semibold">{cartTotal > 50 ? "FREE" : "$9.99"}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-lg">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-primary">
                      ${(cartTotal + (cartTotal > 50 ? 0 : 9.99)).toFixed(2)}
                    </span>
                  </div>
                </div>

                <Link to="/checkout">
                  <Button className="w-full bg-cta hover:bg-cta/90 text-cta-foreground" size="lg">
                    Proceed to Checkout
                  </Button>
                </Link>

                <Link to="/products">
                  <Button variant="outline" className="w-full mt-3">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
