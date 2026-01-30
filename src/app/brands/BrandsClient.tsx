"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Brand } from "@/types";
import { getProductsByBrand } from "@/getRelatedProductsActions/getProductsByBrand.action";
import ProductCard from "../_components/ProductCard";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface BrandsClientProps {
  brands: Brand[];
}

export default function BrandsClient({ brands }: BrandsClientProps) {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(
    brands?.[0]?._id || null
  );
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedBrand) {
      const fetchProducts = async () => {
        setLoading(true);
        try {
          const res = await getProductsByBrand(selectedBrand);
          setProducts(res.data || []);
        } catch (error) {
          console.error("Failed to fetch products", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }
  }, [selectedBrand]);

  return (
    <div className="space-y-10">
      {/* Brands Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {brands.map((brand) => (
          <div
            key={brand._id}
            onClick={() => setSelectedBrand(brand._id)}
            className={cn(
              "cursor-pointer group relative overflow-hidden rounded-xl border-2 transition-all p-2 flex flex-col items-center gap-2",
              selectedBrand === brand._id
                ? "border-primary bg-primary/5 shadow-md"
                : "border-transparent bg-muted/20 hover:border-primary/50 hover:bg-muted/40"
            )}
          >
            <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-white">
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                className="object-contain p-2 transition-transform group-hover:scale-105"
              />
            </div>
            <span className="font-medium text-center text-sm line-clamp-1">
              {brand.name}
            </span>
          </div>
        ))}
      </div>

      {/* Selected Content Area */}
      <div className="min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin mb-2" />
            <p>Loading products...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <p>No products found for this brand.</p>
          </div>
        )}
      </div>
    </div>
  );
}
