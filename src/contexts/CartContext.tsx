// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { Product, CartItem, getCart, saveCart, addToCart as addToCartLS, removeFromCart as removeFromCartLS, updateCartQuantity, clearCart } from '@/lib/localStorage';
// import { toast } from 'sonner';

// interface CartContextType {
//   cart: CartItem[];
//   addToCart: (product: Product, quantity?: number) => void;
//   removeFromCart: (productId: string) => void;
//   updateQuantity: (productId: string, quantity: number) => void;
//   clearCart: () => void;
//   cartTotal: number;
//   cartItemCount: number;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [cart, setCart] = useState<CartItem[]>([]);

//   useEffect(() => {
//     setCart(getCart());
//   }, []);

//   const addToCart = (product: Product, quantity: number = 1) => {
//     addToCartLS(product, quantity);
//     setCart(getCart());
//     toast.success(`${product.name} added to cart`);
//   };

//   const removeFromCart = (productId: string) => {
//     removeFromCartLS(productId);
//     setCart(getCart());
//     toast.success('Item removed from cart');
//   };

//   const updateQuantity = (productId: string, quantity: number) => {
//     if (quantity <= 0) {
//       removeFromCart(productId);
//       return;
//     }
//     updateCartQuantity(productId, quantity);
//     setCart(getCart());
//   };

//   const handleClearCart = () => {
//     clearCart();
//     setCart([]);
//   };

//   const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
//   const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <CartContext.Provider value={{ 
//       cart, 
//       addToCart, 
//       removeFromCart, 
//       updateQuantity, 
//       clearCart: handleClearCart, 
//       cartTotal,
//       cartItemCount 
//     }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within CartProvider');
//   }
//   return context;
// };
















// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";

// interface Product {
//   _id?: string;
//   ProductName: string;
//   Description?: string;
//   Category: string;
//   Price: number;
//   CompareatPrice?: number;
//   StockQuantity: number;
//   img3: string;
// }

// interface CartItem extends Product {
//   quantity: number;
// }

// interface CartContextType {
//   cart: CartItem[];
//   addToCart: (product: Product, quantity?: number) => Promise<void>;
//   removeFromCart: (id: string) => Promise<void>;
//   updateQuantity: (id: string, quantity: number) => void; // ✅ Add this
//   cartTotal: number;
//   syncCart: () => Promise<void>;
//   loading: boolean;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider = ({ children }: { children: React.ReactNode }) => {
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [cartTotal, setCartTotal] = useState(0);
//   const token = Cookies.get("token");

//   // Fetch cart from backend
//   const syncCart = async () => {
//     if (!token) return;
//     try {
//       setLoading(true);
//       const res = await axios.get("https://realdealbackend.onrender.com/addtocart", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const backendCart = res.data.cards || [];
//       setCart(
//         backendCart.map((item: any) => ({
//           ...item,
//           quantity: item.StockQuantity || 1,
//         }))
//       );
//     } catch (err) {
//       console.error("Error fetching cart:", err);
//       setCart([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     syncCart();
//   }, []);

//   // Recalculate total whenever cart changes
//   useEffect(() => {
//     const total = cart.reduce((sum, item) => sum + item.Price * item.quantity, 0);
//     setCartTotal(total);
//   }, [cart]);

//   // ✅ Frontend quantity update
//   const updateQuantity = (id: string, quantity: number) => {
//     if (quantity < 1) return;
//     setCart(prev =>
//       prev.map(item => (item._id === id ? { ...item, quantity } : item))
//     );
//   };

//   // ✅ Add to Cart (frontend + backend integration)
//   const addToCart = async (product: Product, quantity = 1) => {
//     if (!token) {
//       alert("Please log in before adding items to your cart.");
//       return;
//     }

//     try {
//       // 🔹 1. Update frontend cart immediately (instant UI feedback)
//       const existing = cart.find(item => item._id === product._id);
//       if (existing) {
//         updateQuantity(existing._id!, existing.quantity + quantity);
//       } else {
//         setCart(prev => [...prev, { ...product, quantity }]);
//       }

//       // 🔹 2. Prepare sanitized payload for backend
//       const payload = {
//         ProductName: product.ProductName || "Unnamed Product",
//         SKU: product._id || "NO-SKU",
//         Description: product.Description || "No description available",
//         Specifications: product?.Specifications || "N/A",
//         Price: Number(product.Price) > 0 ? Number(product.Price) : 1,
//         CompareatPrice:
//           Number(product.CompareatPrice) > 0
//             ? Number(product.CompareatPrice)
//             : Number(product.Price) || 1,
//         Weight: product?.Weight || "N/A",
//         Category: product.Category || "Uncategorized",
//         StockQuantity: quantity > 0 ? quantity : 1,
//         img3: product?.img3 || "https://via.placeholder.com/150",
//       };

//       // 🔹 3. Sync with backend
//       const res = await axios.post("https://realdealbackend.onrender.com/addtocart", payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("✅ Product added to cart:", res.data);

//       // 🔹 4. Resync cart to reflect backend changes (in case of IDs or merges)
//       await syncCart();
//     } catch (err: any) {
//       console.error("Error adding product to cart:", err);
//       alert(
//         err.response?.data?.message ||
//         "❌ Failed to add product to cart. Please try again."
//       );
//     }
//   };






//   const removeFromCart = async (id: string) => {
//     // Keep a copy in case backend request fails
//     const prevCart = [...cart];

//     // Optimistically update UI (remove item immediately)
//     setCart(prev => prev.filter(item => item._id !== id));

//     if (!token) {
//       console.warn("No token found — cannot sync with backend.");
//       return;
//     }

//     try {
//       // Remove item from backend
//       await axios.delete(`https://realdealbackend.onrender.com/addtocart/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log(`✅ Item ${id} removed successfully from backend.`);
//     } catch (err) {
//       console.error("❌ Error removing item from backend:", err);

//       // Rollback UI in case backend delete fails
//       setCart(prevCart);
//       alert("Failed to remove item. Please try again.");
//     }
//   };


//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, removeFromCart, updateQuantity, cartTotal, syncCart, loading }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) throw new Error("useCart must be used within CartProvider");
//   return context;
// };


import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface Product {
  _id?: string;
  ProductName: string;
  Description?: string;
  Category: string;
  Price: number;
  CompareatPrice?: number;
  StockQuantity: number;
  img3: string;
  Specifications?: string;
  Weight?: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => void;
  cartTotal: number;
  syncCart: () => Promise<void>;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const token = Cookies.get("token");

  // ✅ Sync cart with backend
  const syncCart = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await axios.get(`https://realdealbackend.onrender.com/addtocart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const backendCart = res.data.cards || [];
      setCart(
        backendCart.map((item: any) => ({
          ...item,
          quantity: item.StockQuantity || 1,
        }))
      );
    } catch (err) {
      console.error("❌ Error fetching cart:", err);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    syncCart();
  }, []);

  // ✅ Recalculate total whenever cart changes
  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.Price * item.quantity, 0);
    setCartTotal(total);
  }, [cart]);

  // ✅ Update quantity (frontend)
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev =>
      prev.map(item => (item._id === id ? { ...item, quantity } : item))
    );
  };

  // ✅ Add to Cart (frontend + backend integration)
  const addToCart = async (product: Product, quantity = 1) => {
    if (!token) {
      alert("Please log in before adding items to your cart.");
      return;
    }

    try {
      // 🔹 1. Update frontend cart immediately (instant UI feedback)
      const existing = cart.find(item => item._id === product._id);
      if (existing) {
        // If item already in cart → increment locally
        updateQuantity(existing._id!, existing.quantity + quantity);
      } else {
        // Otherwise → add new item locally
        setCart(prev => [...prev, { ...product, quantity }]);
      }

      // 🔹 2. Prepare sanitized payload for backend
      const payload = {
        ProductName: product.ProductName || "Unnamed Product",
        SKU: product._id || "NO-SKU",
        Description: product.Description || "No description available",
        Specifications: product.Specifications || "N/A",
        Price: Number(product.Price) > 0 ? Number(product.Price) : 1,
        CompareatPrice:
          Number(product.CompareatPrice) > 0
            ? Number(product.CompareatPrice)
            : Number(product.Price) || 1,
        Weight: product.Weight || "N/A",
        Category: product.Category || "Uncategorized",
        StockQuantity: quantity > 0 ? quantity : 1,
        img3: product.img3 || "https://via.placeholder.com/150",
      };

      // 🔹 3. Sync with backend
      const res = await axios.post("https://realdealbackend.onrender.com/addtocart", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Product added to cart:", res.data);

      // 🔹 4. Re-sync cart to reflect backend changes (in case of merges or new IDs)
      await syncCart();
    } catch (err: any) {
      console.error("Error adding product to cart:", err);
      alert(
        err.response?.data?.message ||
        "❌ Failed to add product to cart. Please try again."
      );
    }
  };

  // ✅ Remove item from cart (frontend + backend)
  const removeFromCart = async (id: string) => {
    const prevCart = [...cart]; // Keep backup

    // 🔹 1. Optimistically remove item from UI
    setCart(prev => prev.filter(item => item._id !== id));

    if (!token) {
      console.warn("⚠️ No token found — cannot sync with backend.");
      return;
    }

    try {
      // 🔹 2. Remove item from backend
      await axios.delete(`https://realdealbackend.onrender.com/addtocart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(`✅ Item ${id} removed successfully from backend.`);
    } catch (err) {
      console.error("❌ Error removing item from backend:", err);
      setCart(prevCart); // Rollback UI on failure
      alert("Failed to remove item. Please try again.");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        syncCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Custom hook for accessing cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart must be used within a CartProvider");
  return context;
};
