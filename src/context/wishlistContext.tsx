"use client";
import { getWishlist } from "@/wishlistActions/getWishlist.action";
import { addToWishlist } from "@/wishlistActions/addToWishlist.action";
import { removeFromWishlist } from "@/wishlistActions/removeFromWishlist.action";
import React, { createContext, useEffect, useState, useContext } from "react";
import { toast } from "sonner";

export interface WishlistContextType {
  wishlistIds: string[];
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  refreshWishlist: () => Promise<void>;
}

export const wishlistContext = createContext<WishlistContextType>({
  wishlistIds: [],
  addToWishlist: async () => {},
  removeFromWishlist: async () => {},
  isInWishlist: () => false,
  refreshWishlist: async () => {},
});

export const useWishlist = () => useContext(wishlistContext);

export default function WishlistContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  const refreshWishlist = async () => {
    try {
      const res = await getWishlist();
      if (res?.data) {
        // Map the product objects to just IDs for the context state
        const ids = res.data.map((item: any) => item._id || item.id);
        setWishlistIds(ids);
      }
    } catch (error) {
      console.error("Failed to load wishlist", error);
    }
  };

  useEffect(() => {
    refreshWishlist();
  }, []);

  const handleAddToWishlist = async (productId: string) => {
    try {
      const res = await addToWishlist(productId);
      if (res?.status === "success") {
        toast.success(res.message);
        setWishlistIds(res.data); // API returns the array of IDs
      } else {
        toast.error("Failed to add to wishlist");
      }
    } catch (error) {
      toast.error("Error adding to wishlist");
      console.error(error);
    }
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      const res = await removeFromWishlist(productId);
      if (res?.status === "success") {
        toast.success(res.message);
        setWishlistIds(res.data); // API returns the array of IDs
      } else {
        toast.error("Failed to remove from wishlist");
      }
    } catch (error) {
      toast.error("Error removing from wishlist");
      console.error(error);
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlistIds.includes(productId);
  };

  return (
    <wishlistContext.Provider
      value={{
        wishlistIds,
        addToWishlist: handleAddToWishlist,
        removeFromWishlist: handleRemoveFromWishlist,
        isInWishlist,
        refreshWishlist,
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
}
