// import { useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { Minus, Plus, ShoppingCart, Star, ArrowLeft } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { getProductById } from '@/lib/localStorage';
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

// const ProductDetail = () => {
//   const { id } = useParams<{ id: string }>();
//   const product = id ? getProductById(id) : null;
//   const { addToCart } = useCart();
//   const [quantity, setQuantity] = useState(1);

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold mb-4">Product not found</h2>
//           <Link to="/products">
//             <Button>Back to Products</Button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const handleAddToCart = () => {
//     addToCart(product, quantity);
//   };

//   return (
//     <div className="min-h-screen py-12">
//       <div className="container mx-auto px-4">
//         <Link to="/products" className="inline-flex items-center text-primary hover:underline mb-8">
//           <ArrowLeft className="h-4 w-4 mr-2" />
//           Back to Products
//         </Link>

//         <div className="grid md:grid-cols-2 gap-12">
//           {/* Product Image */}
//           <div className="aspect-square rounded-lg overflow-hidden bg-muted">
//             <img
//               src={imageMap[product.image]}
//               alt={product.name}
//               className="w-full h-full object-cover"
//             />
//           </div>

//           {/* Product Info */}
//           <div>
//             <div className="mb-4">
//               <Badge className="mb-2">{product.category}</Badge>
//               {!product.inStock && (
//                 <Badge variant="destructive" className="ml-2">Out of Stock</Badge>
//               )}
//             </div>

//             <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

//             {product.rating && (
//               <div className="flex items-center gap-2 mb-6">
//                 <div className="flex items-center gap-1">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className={`h-5 w-5 ${i < Math.floor(product.rating!)
//                         ? 'fill-cta text-cta'
//                         : 'text-muted-foreground'
//                         }`}
//                     />
//                   ))}
//                 </div>
//                 <span className="text-muted-foreground">({product.reviews} reviews)</span>
//               </div>
//             )}

//             <p className="text-4xl font-bold text-primary mb-6">${product.price.toFixed(2)}</p>

//             <p className="text-foreground mb-6 leading-relaxed">{product.description}</p>

//             {product.specifications && (
//               <div className="mb-8">
//                 <h3 className="font-semibold mb-3">Specifications:</h3>
//                 <ul className="space-y-2">
//                   {product?.specifications?.map((spec, index) => (
//                     <li key={index} className="flex items-center text-muted-foreground">
//                       <span className="w-2 h-2 bg-primary rounded-full mr-3" />
//                       {spec}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* Quantity Selector */}
//             <div className="flex items-center gap-4 mb-6">
//               <span className="font-semibold">Quantity:</span>
//               <div className="flex items-center border border-border rounded-lg">
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                   disabled={!product.inStock}
//                 >
//                   <Minus className="h-4 w-4" />
//                 </Button>
//                 <span className="px-6 font-semibold">{quantity}</span>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => setQuantity(quantity + 1)}
//                   disabled={!product.inStock}
//                 >
//                   <Plus className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>

//             <Button
//               size="lg"
//               onClick={handleAddToCart}
//               disabled={!product.inStock}
//               className="w-full md:w-auto bg-cta hover:bg-cta/90 text-cta-foreground"
//             >
//               <ShoppingCart className="h-5 w-5 mr-2" />
//               Add to Cart
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;









// import { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import { Minus, Plus, ShoppingCart, ArrowLeft } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { useCart } from "@/contexts/CartContext";

// const ProductDetail = () => {
//   const { id } = useParams<{ id: string }>();
//   const [product, setProduct] = useState<any>(null);
//   const [quantity, setQuantity] = useState<number>(1);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const { addToCart } = useCart();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const res = await axios.get(`https://realdealbackend.onrender.com/add/${id}`);
//         let data = res.data.fishingTool;

//         // ✅ Normalize response: ensure `product` is an object
//         if (data && typeof data === "object") {
//           if (data.product) {
//             setProduct(data.product);
//           } else if (Array.isArray(data)) {
//             // Sometimes backend returns an array of one item
//             setProduct(data[0]);
//           } else {
//             setProduct(data);
//           }
//         } else {
//           console.warn("⚠️ Unexpected API format:", data);
//           setError("Invalid product data format.");
//         }
//       } catch (err) {
//         console.error("❌ Error fetching product:", err);
//         setError("Failed to load product. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchProduct();
//   }, [id]);

//   const handleAddToCart = () => {
//     if (!product) return;
//     addToCart(product, quantity);
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-12 text-muted-foreground text-lg animate-pulse">
//         Loading product...
//       </div>
//     );
//   }

//   if (error || !product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold mb-4">
//             {error || "Product not found"}
//           </h2>
//           <Link to="/products">
//             <Button variant="default">Back to Products</Button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen py-12">
//       <div className="container mx-auto px-4">
//         <Link
//           to="/products"
//           className="inline-flex items-center text-primary hover:underline mb-8"
//         >
//           <ArrowLeft className="h-4 w-4 mr-2" />
//           Back to Products
//         </Link>

//         <div className="grid md:grid-cols-2 gap-12">
//           {/* Product Image */}
//           <div className="aspect-square rounded-lg overflow-hidden bg-muted shadow">
//             <img
//               src={
//                 product?.img3 ||
//                 "https://via.placeholder.com/500x500?text=No+Image"
//               }
//               alt={product.ProductName || "Product"}
//               className="w-full h-full object-cover"
//             />
//           </div>

//           {/* Product Info */}
//           <div>
//             <div className="mb-4">
//               {product.Category && (
//                 <Badge className="mb-2">{product.Category}</Badge>
//               )}
//               {product.StockQuantity <= 0 && (
//                 <Badge variant="destructive" className="ml-2">
//                   Out of Stock
//                 </Badge>
//               )}
//             </div>

//             <h1 className="text-4xl font-bold mb-4">
//               {product.ProductName || "Unnamed Product"}
//             </h1>

//             <p className="text-3xl font-bold text-primary mb-6">
//               $
//               {Number(product.Price)
//                 ? Number(product.Price).toFixed(2)
//                 : "0.00"}
//             </p>

//             <p className="text-foreground mb-6 leading-relaxed">
//               {product.Description || "No description available."}
//             </p>

//             {/* Quantity Selector */}
//             <div className="flex items-center gap-4 mb-6">
//               <span className="font-semibold">Quantity:</span>
//               <div className="flex items-center border border-border rounded-lg">
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                   disabled={product.StockQuantity <= 0}
//                 >
//                   <Minus className="h-4 w-4" />
//                 </Button>
//                 <span className="px-6 font-semibold">{quantity}</span>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => setQuantity(quantity + 1)}
//                   disabled={product.StockQuantity <= 0}
//                 >
//                   <Plus className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>

//             <Button
//               size="lg"
//               onClick={handleAddToCart}
//               disabled={product.StockQuantity <= 0}
//               className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white"
//             >
//               <ShoppingCart className="h-5 w-5 mr-2" />
//               Add to Cart
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;



// // src/pages/ProductDetail.tsx
// import { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import { Minus, Plus, ShoppingCart, ArrowLeft } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import Cookies from "js-cookie";

// const ProductDetail = () => {
//   const { id } = useParams<{ id: string }>();
//   const [product, setProduct] = useState<any>(null);
//   const [quantity, setQuantity] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [adding, setAdding] = useState(false);

//   const token = Cookies.get("token");

//   // 🔹 Fetch single product by ID
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await axios.get(`https://realdealbackend.onrender.com/add/${id}`);
//         if (res.status === 200) {
//           setProduct(res.data.fishingTool);
//         } else {
//           console.error("Unexpected response:", res);
//         }
//       } catch (err) {
//         console.error("❌ Error fetching product:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchProduct();
//   }, [id]);

//   const handleAddToCart = async () => {
//     if (!token) {
//       alert("Please log in before adding items to your cart.");
//       return;
//     }

//     try {
//       setAdding(true);

//       // Map frontend product to backend expected fields
//       const payload = {
//         ProductName: product.ProductName,
//         SKU: product._id, // your unique product ID
//         Description: product.Description,
//         Specifications: "N/A", // or product.Specifications if exists
//         Price: Number(product.Price), // make sure it’s a number
//         CompareatPrice: Number(product.CompareatPrice || 0),
//         Weight: "N/A", // default
//         Category: product.Category,
//         StockQuantity: quantity,
//         img3: product.img3,
//       };

//       const res = await axios.post(
//         "https://realdealbackend.onrender.com/addtocart",
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       window.location.reload()
//       console.log("Added to cart:", res.data);
//       alert("✅ Product added to your cart!");
//     } catch (err: any) {
//       console.error("Error adding product to cart:", err);
//       alert(err.response?.data?.message || "❌ Failed to add product to cart.");
//     } finally {
//       setAdding(false);
//     }
//   };



//   // 🔹 Loading / Not Found States
//   if (loading)
//     return (
//       <div className="text-center py-12 text-muted-foreground">
//         Loading product...
//       </div>
//     );

//   if (!product)
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold mb-4">Product not found</h2>
//           <Link to="/products">
//             <Button>Back to Products</Button>
//           </Link>
//         </div>
//       </div>
//     );

//   // 🔹 Main UI
//   return (
//     <div className="min-h-screen py-12">
//       <div className="container mx-auto px-4">
//         <Link
//           to="/products"
//           className="inline-flex items-center text-primary hover:underline mb-8"
//         >
//           <ArrowLeft className="h-4 w-4 mr-2" />
//           Back to Products
//         </Link>

//         <div className="grid md:grid-cols-2 gap-12">
//           {/* 🖼️ Product Image */}
//           <div className="aspect-square rounded-lg overflow-hidden bg-muted">
//             <img
//               src={product.img3}
//               alt={product.ProductName}
//               className="w-full h-full object-cover"
//             />
//           </div>

//           {/* 🧾 Product Info */}
//           <div>
//             <div className="mb-4">
//               <Badge className="mb-2">{product.Category}</Badge>
//               {Number(product.StockQuantity) <= 0 && (
//                 <Badge variant="destructive" className="ml-2">
//                   Out of Stock
//                 </Badge>
//               )}
//             </div>

//             <h1 className="text-4xl font-bold mb-4">{product.ProductName}</h1>

//             <p className="text-3xl font-bold text-primary mb-6">
//               ${product.Price ? Number(product.Price).toFixed(2) : "0.00"}
//             </p>

//             <p className="text-foreground mb-6 leading-relaxed">
//               {product.Description}
//             </p>

//             {/* 🔸 Quantity Selector */}
//             <div className="flex items-center gap-4 mb-6">
//               <span className="font-semibold">Quantity:</span>
//               <div className="flex items-center border border-border rounded-lg">
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                 >
//                   <Minus className="h-4 w-4" />
//                 </Button>
//                 <span className="px-6 font-semibold">{quantity}</span>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => setQuantity(quantity + 1)}
//                 >
//                   <Plus className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>

//             {/* 🛒 Add to Cart */}
//             <Button
//               size="lg"
//               onClick={handleAddToCart}
//               disabled={Number(product.StockQuantity) <= 0 || adding}
//               className="w-full md:w-auto bg-cta hover:bg-cta/90 text-cta-foreground"
//             >
//               {adding ? (
//                 "Adding..."
//               ) : (
//                 <>
//                   <ShoppingCart className="h-5 w-5 mr-2" />
//                   Add to Cart
//                 </>
//               )}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;



























// src/pages/ProductDetail.tsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Minus, Plus, ShoppingCart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Cookies from "js-cookie";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [mainImage, setMainImage] = useState<string>("");

  const token = Cookies.get("token");

  // 🔹 Fetch product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://realdealbackend.onrender.com/add/${id}`);
        if (res.status === 200) {
          const data = res.data.fishingTool;
          setProduct(data);
          setMainImage(data.img3); // default main image
        }
      } catch (err) {
        console.error("❌ Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  // 🛒 Add to Cart
  const handleAddToCart = async () => {
    if (!token) {
      alert("Please log in before adding items to your cart.");
      return;
    }

    try {
      setAdding(true);
      const payload = {
        ProductName: product.ProductName,
        SKU: product._id,
        Description: product.Description,
        Specifications: "N/A",
        Price: Number(product.Price),
        CompareatPrice: Number(product.CompareatPrice || 0),
        Weight: "N/A",
        Category: product.Category,
        StockQuantity: quantity,
        img3: product.img3,
      };

      const res = await axios.post(
        "https://realdealbackend.onrender.com/addtocart",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Added to cart:", res.data);
      alert("✅ Product added to your cart!");
      window.location.reload();
    } catch (err: any) {
      console.error("Error adding to cart:", err);
      alert(err.response?.data?.message || "❌ Failed to add product.");
    } finally {
      setAdding(false);
    }
  };

  // 🔹 Loading and not found states
  if (loading)
    return <div className="text-center py-12 text-muted-foreground">Loading product...</div>;

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );

  // 🔹 Collect all available images
  const imageList = [product.img3, product.img2, product.img4, product.img5, product.img6].filter(
    (img) => img && img.trim() !== ""
  );

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Link
          to="/products"
          className="inline-flex items-center text-primary hover:underline mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* 🖼️ Product Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="aspect-square rounded-lg overflow-hidden bg-muted mb-4 border border-border">
              <img
                src={mainImage}
                alt={product.ProductName}
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 justify-center flex-wrap">
              {imageList.map((img: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setMainImage(img)}
                  className={`w-20 h-20 border-2 rounded-md overflow-hidden ${mainImage === img ? "border-primary" : "border-transparent hover:border-primary/50"
                    } transition-all`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* 🧾 Product Info */}
          <div>
            <div className="mb-4">
              <Badge className="mb-2">{product.Category}</Badge>
              {Number(product.StockQuantity) <= 0 && (
                <Badge variant="destructive" className="ml-2">
                  Out of Stock
                </Badge>
              )}
            </div>

            <h1 className="text-4xl font-bold mb-4">{product.ProductName}</h1>

            <p className="text-3xl font-bold text-primary mb-6">
              ${product.Price ? Number(product.Price).toFixed(2) : "0.00"}
            </p>

            <p className="text-foreground mb-6 leading-relaxed">
              {product.Description}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-semibold">Quantity:</span>
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-6 font-semibold">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={Number(product.StockQuantity) <= 0 || adding}
              className="w-full md:w-auto bg-cta hover:bg-cta/90 text-cta-foreground"
            >
              {adding ? (
                "Adding..."
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
