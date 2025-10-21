// import { useState, useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import ProductCard from '@/components/ProductCard';
// import { getProducts, getProductsByCategory } from '@/lib/localStorage';
// import { Button } from '@/components/ui/button';
// import { Product } from '@/lib/localStorage';

// const Products = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [products, setProducts] = useState<Product[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState<string>('all');

//   const categories = ['all', 'Rods & Reels', 'Lures & Baits', 'Tackle & Gear', 'Apparel'];

//   useEffect(() => {
//     const category = searchParams.get('category');
//     if (category) {
//       setSelectedCategory(category);
//       setProducts(getProductsByCategory(category));
//     } else {
//       setSelectedCategory('all');
//       setProducts(getProducts());
//     }
//   }, [searchParams]);

//   const handleCategoryChange = (category: string) => {
//     setSelectedCategory(category);
//     if (category === 'all') {
//       setSearchParams({});
//       setProducts(getProducts());
//     } else {
//       setSearchParams({ category });
//       setProducts(getProductsByCategory(category));
//     }
//   };

//   return (
//     <div className="min-h-screen py-12">
//       <div className="container mx-auto px-4">
//         <h1 className="text-4xl font-bold mb-8">Our Products</h1>

//         {/* Category Filter */}
//         <div className="mb-8 flex flex-wrap gap-2">
//           {categories.map((category) => (
//             <Button
//               key={category}
//               variant={selectedCategory === category ? "default" : "outline"}
//               onClick={() => handleCategoryChange(category)}
//               className={selectedCategory === category ? "bg-primary" : ""}
//             >
//               {category === 'all' ? 'All Products' : category}
//             </Button>
//           ))}
//         </div>

//         {/* Products Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {products.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>

//         {products.length === 0 && (
//           <div className="text-center py-12">
//             <p className="text-muted-foreground text-lg">No products found in this category.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Products;















import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get("category") || "all"
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const categories = ["all", "Rods", "Reels", "Hooks", "Lures", "Lines", "Accessories"];

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get("https://realdealbackend.onrender.com/add");
      let data = res.data.fishingTools;

      // ✅ Normalize data: ensure it's always an array
      if (Array.isArray(data)) {
        setProducts(data);
      } else if (data?.products && Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        console.warn("⚠️ Unexpected API format:", data);
        setProducts([]); // fallback
      }
    } catch (err: any) {
      console.error("❌ Error fetching products:", err);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : Array.isArray(products)
        ? products.filter(
          (p) =>
            p?.Category?.toLowerCase() === selectedCategory.toLowerCase()
        )
        : [];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchParams(category === "all" ? {} : { category });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Products</h1>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => handleCategoryChange(category)}
              className={`capitalize ${selectedCategory === category ? "bg-primary text-white" : ""
                }`}
            >
              {category === "all" ? "All Products" : category}
            </Button>
          ))}
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-8 text-red-500 font-medium">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground text-lg animate-pulse">
            Loading products...
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />

            ))}
          </div>
        ) : (
          !loading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No products found in this category.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Products;
