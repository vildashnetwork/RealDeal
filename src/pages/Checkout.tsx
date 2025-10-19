// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { CreditCard, Lock } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { useCart } from '@/contexts/CartContext';
// import { useAuth } from '@/contexts/AuthContext';
// import { createOrder } from '@/lib/localStorage';
// import { toast } from 'sonner';

// const Checkout = () => {
//   const navigate = useNavigate();
//   const { cart, cartTotal, clearCart } = useCart();
//   const { user, isAuthenticated } = useAuth();

//   const [formData, setFormData] = useState({
//     name: user?.name || '',
//     email: user?.email || '',
//     phone: user?.phone || '',
//     street: user?.address?.street || '',
//     city: user?.address?.city || '',
//     state: user?.address?.state || '',
//     zip: user?.address?.zip || '',
//     cardNumber: '',
//     cardExpiry: '',
//     cardCVC: ''
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!isAuthenticated) {
//       toast.error('Please login to complete your order');
//       navigate('/auth');
//       return;
//     }

//     if (cart.length === 0) {
//       toast.error('Your cart is empty');
//       navigate('/products');
//       return;
//     }

//     // Validate form
//     if (!formData.name || !formData.email || !formData.street || !formData.city || 
//         !formData.cardNumber || !formData.cardExpiry || !formData.cardCVC) {
//       toast.error('Please fill in all required fields');
//       return;
//     }

//     // Simulate payment processing
//     const order = createOrder({
//       userId: user!.id,
//       items: cart,
//       total: cartTotal + (cartTotal > 50 ? 0 : 9.99),
//       status: 'processing',
//       shippingAddress: {
//         street: formData.street,
//         city: formData.city,
//         state: formData.state,
//         zip: formData.zip
//       },
//       paymentMethod: `**** **** **** ${formData.cardNumber.slice(-4)}`
//     });

//     clearCart();
//     navigate(`/order-confirmation/${order.id}`);
//   };

//   if (cart.length === 0) {
//     navigate('/cart');
//     return null;
//   }

//   const shipping = cartTotal > 50 ? 0 : 9.99;
//   const total = cartTotal + shipping;

//   return (
//     <div className="min-h-screen py-12">
//       <div className="container mx-auto px-4 max-w-4xl">
//         <h1 className="text-4xl font-bold mb-8">Checkout</h1>

//         <form onSubmit={handleSubmit}>
//           <div className="grid lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2 space-y-6">
//               {/* Shipping Information */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Shipping Information</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div>
//                     <Label htmlFor="name">Full Name *</Label>
//                     <Input
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <Label htmlFor="email">Email *</Label>
//                       <Input
//                         id="email"
//                         name="email"
//                         type="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="phone">Phone</Label>
//                       <Input
//                         id="phone"
//                         name="phone"
//                         type="tel"
//                         value={formData.phone}
//                         onChange={handleChange}
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <Label htmlFor="street">Street Address *</Label>
//                     <Input
//                       id="street"
//                       name="street"
//                       value={formData.street}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   <div className="grid grid-cols-3 gap-4">
//                     <div className="col-span-2">
//                       <Label htmlFor="city">City *</Label>
//                       <Input
//                         id="city"
//                         name="city"
//                         value={formData.city}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="state">State</Label>
//                       <Input
//                         id="state"
//                         name="state"
//                         value={formData.state}
//                         onChange={handleChange}
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <Label htmlFor="zip">ZIP Code</Label>
//                     <Input
//                       id="zip"
//                       name="zip"
//                       value={formData.zip}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Payment Information */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <Lock className="h-5 w-5" />
//                     Secure Payment
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div>
//                     <Label htmlFor="cardNumber">Card Number *</Label>
//                     <div className="relative">
//                       <Input
//                         id="cardNumber"
//                         name="cardNumber"
//                         placeholder="1234 5678 9012 3456"
//                         value={formData.cardNumber}
//                         onChange={handleChange}
//                         maxLength={19}
//                         required
//                       />
//                       <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <Label htmlFor="cardExpiry">Expiry Date *</Label>
//                       <Input
//                         id="cardExpiry"
//                         name="cardExpiry"
//                         placeholder="MM/YY"
//                         value={formData.cardExpiry}
//                         onChange={handleChange}
//                         maxLength={5}
//                         required
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="cardCVC">CVC *</Label>
//                       <Input
//                         id="cardCVC"
//                         name="cardCVC"
//                         placeholder="123"
//                         value={formData.cardCVC}
//                         onChange={handleChange}
//                         maxLength={4}
//                         required
//                       />
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Order Summary */}
//             <div className="lg:col-span-1">
//               <Card className="sticky top-20">
//                 <CardHeader>
//                   <CardTitle>Order Summary</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   {cart.map((item) => (
//                     <div key={item.product.id} className="flex justify-between text-sm">
//                       <span className="text-muted-foreground">
//                         {item.product.name} x{item.quantity}
//                       </span>
//                       <span className="font-semibold">
//                         ${(item.product.price * item.quantity).toFixed(2)}
//                       </span>
//                     </div>
//                   ))}

//                   <div className="border-t pt-4 space-y-2">
//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground">Subtotal</span>
//                       <span className="font-semibold">${cartTotal.toFixed(2)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground">Shipping</span>
//                       <span className="font-semibold">
//                         {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
//                       </span>
//                     </div>
//                     <div className="flex justify-between text-lg font-bold pt-2 border-t">
//                       <span>Total</span>
//                       <span className="text-primary">${total.toFixed(2)}</span>
//                     </div>
//                   </div>

//                   <Button type="submit" className="w-full bg-cta hover:bg-cta/90 text-cta-foreground" size="lg">
//                     Place Order
//                   </Button>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Checkout;









// // src/pages/Checkout.tsx
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { useCart } from '@/contexts/CartContext';
// import { toast } from 'sonner';
// import axios from 'axios';

// const Checkout = () => {
//   const navigate = useNavigate();
//   const { cart, cartTotal, clearCart, syncCart } = useCart() as any; // cast to any to avoid strict typing mismatch if your context doesn't expose clearCart
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     street: '',
//     city: '',
//     state: '',
//     zip: ''
//   });
//   const [loading, setLoading] = useState(false);

//   // optional: prefill form with user info if you have it in local storage or other context
//   useEffect(() => {
//     // you can populate defaults here if needed
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const shipping = cartTotal > 50 ? 0 : 9.99;
//   const total = Number((cartTotal + shipping).toFixed(2));

//   // defensive mapper: handles different shapes of product/item objects
//   const mapItemForOrder = (item: any) => {
//     const product = item.product ?? item;

//     const quantity = Number(item.quantity ?? item.StockQuantity ?? 1);
//     const productId = product?._id ?? product?.id ?? product?.SKU ?? null;
//     const name = product?.ProductName ?? product?.name ?? product?.title ?? 'Unnamed Product';
//     const price = Number(product?.Price ?? product?.price ?? 0);

//     return {
//       // fields expected by your Order model
//       productId: productId || undefined, // will be stored as ObjectId if valid string
//       name,
//       quantity,
//       price,

//       // legacy/backend compatibility fields (your older router expected these)
//       ProductName: name,
//       SKU: productId ?? '',
//       Description: product?.Description ?? product?.description ?? '',
//       Specifications: product?.Specifications ?? product?.specifications ?? '',
//       Price: price,
//       CompareatPrice: product?.CompareatPrice ?? product?.compareAtPrice ?? 0,
//       Weight: product?.Weight ?? product?.weight ?? '',
//       Category: product?.Category ?? product?.category ?? '',
//       StockQuantity: quantity,
//       img3: product?.img3 ?? product?.image ?? ''
//     };
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const token = Cookies.get('token');

//     if (!token) {
//       toast.error('Please login to complete your order');
//       navigate('/auth');
//       return;
//     }

//     if (!Array.isArray(cart) || cart.length === 0) {
//       toast.error('Your cart is empty');
//       navigate('/products');
//       return;
//     }

//     if (!formData.name || !formData.email || !formData.street || !formData.city) {
//       toast.error('Please fill in all required fields');
//       return;
//     }

//     setLoading(true);

//     try {
//       // map & validate cart items
//       const mapped = cart
//         .map(mapItemForOrder)
//         .filter(i => i.name && typeof i.price === 'number' && i.quantity > 0);

//       if (mapped.length === 0) {
//         toast.error('No valid items in cart');
//         setLoading(false);
//         return;
//       }

//       const payload = {
//         cartItems: mapped,
//         totalPrice: total,
//         paymentmethod: 'Card', // adapt if you collect payment method
//         ZIPCode: formData.zip || '',
//         State: formData.state || ''
//       };

//       // Debug log so you can inspect what we are sending
//       // eslint-disable-next-line no-console
//       console.log('Checkout payload ->', payload);

//       const res = await axios.post('https://realdealbackend.onrender.com/api/orders', payload, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       // eslint-disable-next-line no-console
//       console.log('Order response:', res.data);

//       // Clear client cart if possible
//       if (typeof clearCart === 'function') {
//         try {
//           await clearCart();
//         } catch (err) {
//           // clear not critical — just warn
//           // eslint-disable-next-line no-console
//           console.warn('clearCart failed:', err);
//         }
//       } else if (typeof syncCart === 'function') {
//         // if no clearCart, force a resync to pick up backend-cleared cart
//         try {
//           await syncCart();
//         } catch (err) {
//           // not fatal
//           // eslint-disable-next-line no-console
//           console.warn('syncCart failed after order:', err);
//         }
//       }

//       toast.success('Order placed successfully!');
//       const orderId = res?.data?._id ?? res?.data?.id;
//       navigate(orderId ? `/order-confirmation/${orderId}` : '/order-confirmation');
//     } catch (err: any) {
//       // eslint-disable-next-line no-console
//       console.error('Checkout error:', err);

//       const msg = err?.response?.data?.message ?? err?.message ?? 'Failed to place order';
//       toast.error(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // guard: redirect to cart if empty
//   useEffect(() => {
//     if (!Array.isArray(cart) || cart.length === 0) {
//       navigate('/cart');
//     }
//   }, [cart, navigate]);

//   return (
//     <div className="min-h-screen py-12">
//       <div className="container mx-auto px-4 max-w-4xl">
//         <h1 className="text-4xl font-bold mb-8">Checkout</h1>

//         <form onSubmit={handleSubmit}>
//           <div className="grid lg:grid-cols-3 gap-8">
//             {/* Shipping Form */}
//             <div className="lg:col-span-2 space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Shipping Information</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div>
//                     <Label htmlFor="name">Full Name *</Label>
//                     <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <Label htmlFor="email">Email *</Label>
//                       <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
//                     </div>
//                     <div>
//                       <Label htmlFor="phone">Phone</Label>
//                       <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
//                     </div>
//                   </div>

//                   <div>
//                     <Label htmlFor="street">Street Address *</Label>
//                     <Input id="street" name="street" value={formData.street} onChange={handleChange} required />
//                   </div>

//                   <div className="grid grid-cols-3 gap-4">
//                     <div className="col-span-2">
//                       <Label htmlFor="city">City *</Label>
//                       <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
//                     </div>
//                     <div>
//                       <Label htmlFor="state">State</Label>
//                       <Input id="state" name="state" value={formData.state} onChange={handleChange} />
//                     </div>
//                   </div>

//                   <div>
//                     <Label htmlFor="zip">ZIP Code</Label>
//                     <Input id="zip" name="zip" value={formData.zip} onChange={handleChange} />
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Order Summary */}
//             <div className="lg:col-span-1">
//               <Card className="sticky top-20">
//                 <CardHeader>
//                   <CardTitle>Order Summary</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   {Array.isArray(cart) && cart.map((item: any, idx: number) => {
//                     const product = item.product ?? item;
//                     const name = product?.ProductName ?? product?.name ?? 'Unnamed Product';
//                     const qty = item.quantity ?? item.StockQuantity ?? 1;
//                     const price = Number(product?.Price ?? product?.price ?? 0);
//                     return (
//                       <div key={product?._id ?? product?.id ?? idx} className="flex justify-between text-sm">
//                         <span className="text-muted-foreground">{name} x{qty}</span>
//                         <span className="font-semibold">${(price * qty).toFixed(2)}</span>
//                       </div>
//                     );
//                   })}

//                   <div className="border-t pt-4 space-y-2">
//                     <div className="flex justify-between">
//                       <span>Subtotal</span>
//                       <span>${cartTotal.toFixed(2)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Shipping</span>
//                       <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
//                     </div>
//                     <div className="flex justify-between text-lg font-bold pt-2 border-t">
//                       <span>Total</span>
//                       <span className="text-primary">${total.toFixed(2)}</span>
//                     </div>
//                   </div>

//                   <Button type="submit" className="w-full" disabled={loading}>
//                     {loading ? 'Processing...' : 'Place Order'}
//                   </Button>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Checkout;




















// // src/pages/Checkout.tsx
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useCart } from "@/contexts/CartContext";
// import { toast } from "sonner";
// import axios from "axios";

// const Checkout = () => {
//   const navigate = useNavigate();
//   const { cart, cartTotal, clearCart, syncCart } = useCart() as any; // cast to any if your context typings differ
//   const [zip, setZip] = useState("");
//   const [stateVal, setStateVal] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Redirect to cart if empty (guard)
//   useEffect(() => {
//     if (!Array.isArray(cart) || cart.length === 0) {
//       navigate("/cart");
//     }
//   }, [cart, navigate]);

//   // map a cart item into the 4 fields required by the schema
//   const mapItem = (item: any) => {
//     // support multiple shapes:
//     // - item = { product: {...}, quantity }
//     // - item = { _id, ProductName, Price, StockQuantity } (subdocument)
//     // - item = { productId, name, price, quantity } (already in final shape)
//     const product = item.product ?? item;

//     // best candidates for productId
//     const productId =
//       product?._id ??
//       product?.id ??
//       item?._id ?? // some carts use item._id as subdoc id
//       product?.SKU ??
//       null;

//     const name =
//       product?.ProductName ??
//       product?.name ??
//       product?.title ??
//       product?.ProductName ??
//       "Unnamed Product";

//     const quantity = Number(item.quantity ?? item.StockQuantity ?? 1);
//     const price = Number(product?.Price ?? product?.price ?? 0);

//     return {
//       productId,
//       name,
//       quantity,
//       price,
//     };
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const token = Cookies.get("token");
//     if (!token) {
//       toast.error("Please login to complete your order");
//       navigate("/auth");
//       return;
//     }

//     if (!zip || !stateVal) {
//       toast.error("ZIPCode and State are required");
//       return;
//     }

//     if (!Array.isArray(cart) || cart.length === 0) {
//       toast.error("Your cart is empty");
//       navigate("/products");
//       return;
//     }

//     setLoading(true);

//     try {
//       const mapped = cart.map(mapItem);

//       // Validate that each mapped item has a productId, name, quantity and numeric price
//       const invalid = mapped.find(
//         (m) =>
//           !m.productId ||
//           !m.name ||
//           !m.quantity ||
//           Number.isNaN(Number(m.price))
//       );
//       if (invalid) {
//         console.error("Invalid mapped cart item:", invalid);
//         toast.error(
//           "One or more cart items are missing required product identifiers. Please refresh your cart."
//         );
//         setLoading(false);
//         return;
//       }

//       const payload = {
//         cartItems: mapped.map((m) => ({
//           productId: m.productId,
//           name: m.name,
//           quantity: m.quantity,
//           price: m.price,
//         })),
//         totalPrice: Number((cartTotal ?? 0).toFixed(2)),
//         paymentmethod: "Card", // change if you capture different method
//         ZIPCode: String(zip),
//         State: String(stateVal),
//       };

//       // debug log — remove in production
//       // console.log("Checkout payload", payload);

//       const res = await axios.post(
//         "https://realdealbackend.onrender.com/api/orders",
//         payload,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       // clear/resync client cart
//       if (typeof clearCart === "function") {
//         try {
//           await clearCart();
//         } catch (err) {
//           // fallback to sync
//           if (typeof syncCart === "function") await syncCart();
//         }
//       } else if (typeof syncCart === "function") {
//         await syncCart();
//       }

//       toast.success("Order placed successfully");
//       const orderId = res?.data?._id ?? res?.data?.id;
//       navigate(orderId ? `/order-confirmation/${orderId}` : "/order-confirmation");
//     } catch (err: any) {
//       console.error("Checkout error:", err);
//       const message =
//         err?.response?.data?.message ?? err?.message ?? "Failed to place order";
//       toast.error(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const shipping = (cartTotal ?? 0) > 50 ? 0 : 9.99;
//   const total = Number(((cartTotal ?? 0) + shipping).toFixed(2));

//   return (
//     <div className="min-h-screen py-12">
//       <div className="container mx-auto px-4 max-w-4xl">
//         <h1 className="text-4xl font-bold mb-8">Checkout</h1>

//         <form onSubmit={handleSubmit}>
//           <div className="grid lg:grid-cols-3 gap-8">
//             {/* Minimal required inputs for Order schema */}
//             <div className="lg:col-span-2 space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Shipping / Required</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div>
//                     <Label htmlFor="zip">ZIP Code *</Label>
//                     <Input
//                       id="zip"
//                       name="zip"
//                       value={zip}
//                       onChange={(e) => setZip(e.target.value)}
//                       required
//                     />
//                   </div>

//                   <div>
//                     <Label htmlFor="state">State *</Label>
//                     <Input
//                       id="state"
//                       name="state"
//                       value={stateVal}
//                       onChange={(e) => setStateVal(e.target.value)}
//                       required
//                     />
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Order Summary */}
//             <div className="lg:col-span-1">
//               <Card className="sticky top-20">
//                 <CardHeader>
//                   <CardTitle>Order Summary</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   {Array.isArray(cart) &&
//                     cart.map((item: any, i: number) => {
//                       const m = mapItem(item);
//                       return (
//                         <div
//                           key={m.productId ?? i}
//                           className="flex justify-between text-sm"
//                         >
//                           <span className="text-muted-foreground">
//                             {m.name} x{m.quantity}
//                           </span>
//                           <span className="font-semibold">
//                             ${(m.price * m.quantity).toFixed(2)}
//                           </span>
//                         </div>
//                       );
//                     })}

//                   <div className="border-t pt-4 space-y-2">
//                     <div className="flex justify-between">
//                       <span>Subtotal</span>
//                       <span>${(cartTotal ?? 0).toFixed(2)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Shipping</span>
//                       <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
//                     </div>
//                     <div className="flex justify-between text-lg font-bold pt-2 border-t">
//                       <span>Total</span>
//                       <span className="text-primary">${total.toFixed(2)}</span>
//                     </div>
//                   </div>

//                   <Button type="submit" className="w-full" disabled={loading}>
//                     {loading ? "Processing..." : "Place Order"}
//                   </Button>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Checkout;










// src/pages/Checkout.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart, syncCart } = useCart() as any;

  // Shipping info
  const [zip, setZip] = useState("");
  const [stateVal, setStateVal] = useState("");

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState("Card");

  const [loading, setLoading] = useState(false);

  // Redirect if cart is empty
  useEffect(() => {
    if (!Array.isArray(cart) || cart.length === 0) {
      navigate("/cart");
    }
  }, [cart, navigate]);

  // Map cart items to backend schema
  const mapItem = (item: any) => {
    const product = item.product ?? item;

    const productId = product?._id ?? product?.id ?? item?._id ?? product?.SKU ?? null;
    const name = product?.ProductName ?? product?.name ?? product?.title ?? "Unnamed Product";
    const quantity = Number(item.quantity ?? item.StockQuantity ?? 1);
    const price = Number(product?.Price ?? product?.price ?? 0);

    return { productId, name, quantity, price };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = Cookies.get("token");
    if (!token) {
      toast.error("Please login to complete your order");
      navigate("/auth");
      return;
    }

    if (!zip || !stateVal) {
      toast.error("ZIPCode and State are required");
      return;
    }

    if (!Array.isArray(cart) || cart.length === 0) {
      toast.error("Your cart is empty");
      navigate("/products");
      return;
    }

    setLoading(true);

    try {
      const mapped = cart.map(mapItem);

      const invalid = mapped.find(
        (m) => !m.productId || !m.name || !m.quantity || Number.isNaN(Number(m.price))
      );
      if (invalid) {
        toast.error("One or more cart items are missing required product identifiers. Refresh your cart.");
        setLoading(false);
        return;
      }

      // Get logged-in user info from localStorage or context
      const userInfo = JSON.parse(localStorage.getItem("user") || "{}");
      const { _id, name, number, address, location, country, email } = userInfo;

      // if (!_id || !name || !number || !address || !location || !country || !email) {
      //   toast.error("Your profile is missing required fields to place an order");
      //   setLoading(false);
      //   return;
      // }

      const payload = {
        user: { _id, name, number, address, location, country, email },
        cartItems: mapped,
        totalPrice: Number((cartTotal ?? 0).toFixed(2)),
        paymentmethod: paymentMethod,
        ZIPCode: zip,
        State: stateVal,
      };

      const res = await axios.post(
        "https://realdealbackend.onrender.com/api/orders",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Clear or sync cart
      if (typeof clearCart === "function") {
        try { await clearCart(); } catch { if (typeof syncCart === "function") await syncCart(); }
      } else if (typeof syncCart === "function") {
        await syncCart();
      }

      toast.success("Order placed successfully");
      const orderId = res?.data?._id ?? res?.data?.id;
      navigate(orderId ? `/order-confirmation/${orderId}` : "/order-confirmation");

    } catch (err: any) {
      console.error("Checkout error:", err);
      toast.error(err?.response?.data?.message ?? err?.message ?? "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  const shipping = (cartTotal ?? 0) > 50 ? 0 : 9.99;
  const total = Number(((cartTotal ?? 0) + shipping).toFixed(2));

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Shipping Info */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping / Required</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="zip">ZIP Code *</Label>
                    <Input id="zip" value={zip} onChange={(e) => setZip(e.target.value)} required />
                  </div>

                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input id="state" value={stateVal} onChange={(e) => setStateVal(e.target.value)} required />
                  </div>

                  <div>
                    <Label>Payment Method *</Label>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="flex space-x-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Card" id="payment-card" />
                        <Label htmlFor="payment-card">Card</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="PayPal" id="payment-paypal" />
                        <Label htmlFor="payment-paypal">PayPal</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Cash" id="payment-cash" />
                        <Label htmlFor="payment-cash">Cash on Delivery</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Array.isArray(cart) &&
                    cart.map((item: any, i: number) => {
                      const m = mapItem(item);
                      return (
                        <div key={m.productId ?? i} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{m.name} x{m.quantity}</span>
                          <span className="font-semibold">${(m.price * m.quantity).toFixed(2)}</span>
                        </div>
                      );
                    })}

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between"><span>Subtotal</span><span>${(cartTotal ?? 0).toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span></div>
                    <div className="flex justify-between text-lg font-bold pt-2 border-t"><span>Total</span><span className="text-primary">${total.toFixed(2)}</span></div>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Processing..." : "Place Order"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
