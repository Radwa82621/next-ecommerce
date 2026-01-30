"use client";
import { Product } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Star, ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";
import { addToCart } from "@/cartActions/addToCart.action";
import AddBtn from "./addBtn/addBtn";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/context/wishlistContext";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const fav = isInWishlist(product.id);

  return (
    <Card className="overflow-hidden flex flex-col h-full group">
<Link href={`/products/${product.id}`}>
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={product.imageCover}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.priceAfterDiscount ? <Badge className="bg-red-500 hover:bg-red-600 w-fit">Sale</Badge> : null}
            {product.quantity < 5 && <Badge variant="destructive" className="w-fit">Low Stock</Badge>}
        </div>
      </div>
      
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start gap-2">
            <div>
                 <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{product.category.name}</p>
                 <CardTitle className="text-base font-bold line-clamp-1 mt-1" title={product.title}>
                    {product.title}
                 </CardTitle>
            </div>
             <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 px-1.5 py-0.5 rounded text-yellow-700 dark:text-yellow-400 shrink-0">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-xs font-bold">{product.ratingsAverage}</span>
             </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 py-2 flex-grow">
         <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
            {product.description}
         </p>
         <div className="mt-4 flex gap-x-5 items-center">
             {/* {product.priceAfterDiscount ? (
               <div className="flex items-baseline gap-2">
                 <span className="text-xl font-extrabold text-primary">EGP {product.priceAfterDiscount}</span>
                 <span className="text-sm text-muted-foreground line-through">EGP {product.price}</span>
               </div>
             ) : (
                <span className="text-xl font-extrabold text-primary">EGP {product.price}</span>
             )} */}


             {product.priceAfterDiscount ? (
                            <>
                              <span className="text-muted-foreground text-sm line-through">EGP {product.price}</span>
                              <span className="font-bold text-lg text-red-600">EGP {product.priceAfterDiscount}</span>
                            </>
                          ) : (
                              <span className="font-bold text-lg">EGP {product.price}</span>
                          )}
         </div>
      </CardContent>
</Link>

      <CardFooter className="p-4 pt-2 gap-2">
       <AddBtn id={product.id}/>
        <Button 
          variant="outline" 
          size="icon" 
          className={cn(
            "shrink-0 transition-colors",
            fav ? "bg-red-50 text-red-500 border-red-200 hover:bg-red-100 dark:bg-red-950/30" : "hover:text-red-500 hover:border-red-200 hover:bg-red-50 dark:hover:bg-red-950/30"
          )}
          onClick={() => {
            if (fav) {
              removeFromWishlist(product.id)
            } else {
              addToWishlist(product.id)
            }
          }}
          title={fav ? "Remove from Wishlist" : "Add to Wishlist"}
        >
            <Heart className={cn("w-4 h-4", fav && "fill-current")} />
        </Button>
      </CardFooter>
    </Card>
  )
}
