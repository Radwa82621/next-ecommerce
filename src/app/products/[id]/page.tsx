import React from 'react';
import { notFound } from 'next/navigation';
import { Product } from '@/types';
import ProductGallery from '@/app/_components/ProductGallery';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator'; 
import { Star, ShoppingCart, Heart, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import AddBtn from '@/app/_components/addBtn/addBtn';
import { getRelatedProducts } from '@/getRelatedProductsActions/getRelatedProducts.action';
import WishlistBtn from '@/app/_components/WishlistBtn/WishlistBtn';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`);

  if (!res.ok) {
     return <div>Product not found</div>;
  }

  const response = await res.json();
  const product: Product = response.data;
// console.log(product.category);

  const relatedProducts = await getRelatedProducts(product.category._id);
  console.log("relatedProducts",relatedProducts);
  if (!product) {
    return notFound();
  }


  return (
    <div className="py-8 md:py-12">
      <Link 
        href="/" 
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column: Image Gallery */}
        <div className="w-full order-2 lg:order-1">
           <ProductGallery images={product.images || [product.imageCover]} title={product.title} />
        </div>

        {/* Right Column: Product Details */}
        <div className="flex flex-col gap-6 order-1 lg:order-2">
          <div>
            <div className="flex items-center gap-2 mb-3">
               <Badge variant="outline" className="text-primary border-primary">
                  {product.brand.name}
               </Badge>
               {product.quantity < 20 && (
                   <span className="text-sm text-red-500 font-medium animate-pulse">
                       Only {product.quantity} items left!
                   </span>
               )}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mt-4">
               <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/40 px-3 py-1 rounded-md">
                  <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  <span className="font-bold text-yellow-700 dark:text-yellow-500">
                    {product.ratingsAverage}
                  </span>
                  <span className="text-sm text-yellow-600 dark:text-yellow-400 ml-1">
                    ({product.ratingsQuantity} ratings)
                  </span>
               </div>
               <span className="text-sm text-muted-foreground">
                  {product.sold} sold
               </span>
            </div>
          </div>

          <div className="h-px bg-border" />

          <div>
             <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-primary">${product.price}</span>
                <span className="text-sm text-muted-foreground">Inclusive of all taxes</span>
             </div>
          </div>

          <div>
             <h3 className="text-lg font-semibold mb-2">Description</h3>
             <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
               {product.description}
             </p>
          </div>

          {/* Subcategories / Tags */}
          {product.subcategory && product.subcategory.length > 0 && (
            <div className="flex flex-wrap gap-2">
                {product.subcategory.map((sub) => (
                    <Badge key={sub._id} variant="secondary">
                        {sub.name}
                    </Badge>
                ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
             {/* <Button size="lg" className="flex-1 gap-2 text-base h-12">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
             </Button> */}
             <AddBtn id={product.id} className="flex-1 gap-2 text-base h-12 w-full"></AddBtn>
             
             <WishlistBtn id={product.id} />
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-muted-foreground">
             <div className="flex items-center gap-2">
                 <Truck className="w-5 h-5 text-primary" />
                 <span>Free Delivery</span>
             </div>
             <div className="flex items-center gap-2">
                 <ShieldCheck className="w-5 h-5 text-primary" />
                 <span>1 Year Warranty</span>
             </div>
          </div>

        </div>
      </div>
    <div className="mt-16 sm:mt-24">
        {relatedProducts?.data?.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold tracking-tight">Related Products</h2>
              <Link href="/products" className="text-sm font-medium text-primary hover:underline">
                View all products
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.data.map((relatedProduct: Product) => (
                <div key={relatedProduct._id} className="group relative bg-card rounded-xl border shadow-sm transition-all hover:shadow-md hover:border-primary/20 flex flex-col overflow-hidden">
                  <div className="aspect-square relative overflow-hidden bg-muted/20">
                    {relatedProduct.imageCover ? (
                      <img 
                        src={relatedProduct.imageCover} 
                        alt={relatedProduct.title}
                        className="object-cover w-full h-full transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        No Image
                      </div>
                    )}
                    {relatedProduct.priceAfterDiscount ? (
                       <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                         Sale
                       </Badge>
                    ) : null}
                  </div>
                  
                  <div className="p-4 flex flex-col flex-1 gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                        {relatedProduct.category?.name}
                      </div>
                      <div className="flex items-center gap-1 text-xs font-semibold text-yellow-600 dark:text-yellow-500">
                         <Star className="w-3 h-3 fill-yellow-500" />
                         {relatedProduct.ratingsAverage}
                      </div>
                    </div>

                    <Link href={`/products/${relatedProduct.id}`} className="block group-hover:text-primary transition-colors">
                      <h3 className="font-semibold text-lg leading-tight line-clamp-2" title={relatedProduct.title}>
                        {relatedProduct.title}
                      </h3>
                    </Link>

                    <div className="mt-auto pt-2 flex items-center justify-between">
                       <div className="flex flex-col">
                          {relatedProduct.priceAfterDiscount ? (
                            <>
                              <span className="text-muted-foreground text-xs line-through">EGP {relatedProduct.price}</span>
                              <span className="font-bold text-lg text-red-600">EGP {relatedProduct.priceAfterDiscount}</span>
                            </>
                          ) : (
                              <span className="font-bold text-lg">EGP {relatedProduct.price}</span>
                          )}
                       </div>
                    </div>
                    
                    <AddBtn id={relatedProduct.id} className="w-full mt-2" />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

