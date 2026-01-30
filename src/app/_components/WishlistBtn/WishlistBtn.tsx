"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/context/wishlistContext";

interface WishlistBtnProps {
  id: string;
}

export default function WishlistBtn({ id }: WishlistBtnProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const fav = isInWishlist(id);

  return (
    <Button
      size="lg"
      variant="outline"
      className={cn(
        "gap-2 text-base h-12 transition-colors",
        fav
          ? "bg-red-50 text-red-500 border-red-200 hover:bg-red-100 dark:bg-red-950/30"
          : "hover:text-red-500 hover:border-red-200 hover:bg-red-50 dark:hover:bg-red-950/30"
      )}
      onClick={() => {
        if (fav) {
          removeFromWishlist(id);
        } else {
          addToWishlist(id);
        }
      }}
      title={fav ? "Remove from Wishlist" : "Add to Wishlist"}
    >
      <Heart className={cn("w-5 h-5", fav && "fill-current")} />
      {fav ? "In Wishlist" : "Wishlist"}
    </Button>
  );
}
