import { Product } from '@/types';
import React from 'react'
import ProductCard from '../_components/ProductCard';

export default async function page() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/products?limit=60", {
    method:"get",
    headers:{},
    cache:"force-cache",
    next:{
      revalidate:60,
    }
  });
  const { data } = await res.json();
  
  return (
    <div className="py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Featured Products</h1>
        <p className="text-muted-foreground mt-2">
            Explore our latest collection of premium products.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}