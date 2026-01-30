"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Category } from "@/types";
import { getRelatedProducts } from "@/getRelatedProductsActions/getRelatedProducts.action";
import ProductCard from "../_components/ProductCard";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoriesClientProps {
  categories: Category[];
}

export default function CategoriesClient({ categories }: CategoriesClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categories?.[0]?._id || null
  );
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedCategory) {
      const fetchProducts = async () => {
        setLoading(true);
        try {
          const res = await getRelatedProducts(selectedCategory);
          setProducts(res.data || []);
        } catch (error) {
          console.error("Failed to fetch products", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }
  }, [selectedCategory]);

  return (
    <div className="space-y-10">
      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {categories.map((category) => (
          <div
            key={category._id}
            onClick={() => setSelectedCategory(category._id)}
            className={cn(
              "cursor-pointer group relative overflow-hidden rounded-xl border-2 transition-all p-2 flex flex-col items-center gap-2",
              selectedCategory === category._id
                ? "border-primary bg-primary/5 shadow-md"
                : "border-transparent bg-muted/20 hover:border-primary/50 hover:bg-muted/40"
            )}
          >
            <div className="relative w-full aspect-square overflow-hidden rounded-lg">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <span className="font-medium text-center text-sm line-clamp-1">
              {category.name}
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
            <p>No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
