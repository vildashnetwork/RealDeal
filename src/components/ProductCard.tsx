// import { Link } from 'react-router-dom';
// import { ShoppingCart, Star } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardFooter } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Product } from '@/lib/localStorage';
// import { useCart } from '@/contexts/CartContext';

// // Import all product images
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

// interface ProductCardProps {
//   product: Product;
// }

// const ProductCard = ({ product }: ProductCardProps) => {
//   const { addToCart } = useCart();

//   const handleAddToCart = (e: React.MouseEvent) => {
//     e.preventDefault();
//     addToCart(product);
//   };

//   return (
//     <Link to={`/product/${product.id}`}>
//       <Card className="h-full hover:shadow-medium transition-shadow group">
//         <div className="aspect-square overflow-hidden rounded-t-lg bg-muted">
//           <img
//             src={imageMap[product.image]}
//             alt={product.name}
//             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//           />
//         </div>
//         <CardContent className="p-4">
//           <div className="flex items-start justify-between gap-2 mb-2">
//             <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
//               {product.name}
//             </h3>
//             {!product.inStock && (
//               <Badge variant="destructive" className="shrink-0">Out of Stock</Badge>
//             )}
//           </div>
//           <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
//           {product.rating && (
//             <div className="flex items-center gap-1 mb-2">
//               <Star className="h-4 w-4 fill-cta text-cta" />
//               <span className="text-sm font-medium">{product.rating}</span>
//               <span className="text-sm text-muted-foreground">({product.reviews})</span>
//             </div>
//           )}
//           <p className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</p>
//         </CardContent>
//         <CardFooter className="p-4 pt-0">
//           <Button
//             onClick={handleAddToCart}
//             disabled={!product.inStock}
//             className="w-full bg-cta hover:bg-cta/90 text-cta-foreground"
//           >
//             <ShoppingCart className="h-4 w-4 mr-2" />
//             Add to Cart
//           </Button>
//         </CardFooter>
//       </Card>
//     </Link>
//   );
// };

// export default ProductCard;














// src/components/ProductCard.tsx
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: {
    _id?: string;
    ProductName?: string;
    Description?: string;
    Category?: string;
    Price?: number | string;
    CompareatPrice?: number | string;
    StockQuantity?: number;
    img3?: string;
    Specifications?: string;
    Weight?: string;
    inStock?: boolean;
    rating?: number;
    reviews?: number;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const navigator = useNavigate();

  const handleViewDetails = () => {
    navigator(`/product/${product._id}`);
  };

  return (
    <Card className="h-full hover:shadow-medium transition-shadow group">
      <div className="aspect-square overflow-hidden rounded-t-lg bg-muted">
        <img
          src={product.img3 || 'https://via.placeholder.com/300'}
          alt={product.ProductName || 'Unnamed Product'}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {product.ProductName || 'Unnamed Product'}
          </h3>
          {!product.inStock && (
            <Badge variant="destructive" className="shrink-0">Out of Stock</Badge>
          )}
        </div>

        <p className="text-sm text-muted-foreground mb-2">
          {product.Category || 'Uncategorized'}
        </p>

        {product.rating && (
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-4 w-4 fill-cta text-cta" />
            <span className="text-sm text-muted-foreground">
              ({product.reviews || 0} reviews)
            </span>
          </div>
        )}

        <p className="text-2xl font-bold text-primary">
          ${Number(product.Price || 0).toFixed(2)}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleViewDetails}
          disabled={product.StockQuantity === 0 || product.inStock === false}
          className="w-full bg-cta hover:bg-cta/90 text-cta-foreground"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
