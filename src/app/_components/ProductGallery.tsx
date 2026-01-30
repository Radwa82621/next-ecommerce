"use client"
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl border bg-gray-100 dark:bg-gray-800">
        <Image
          src={selectedImage}
          alt={title}
          fill
          className="object-contain p-4"
          priority
        />
      </div>
      
      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={cn(
              "relative aspect-square w-20 min-w-20 overflow-hidden rounded-lg border bg-gray-50 dark:bg-gray-900 transition-all",
              selectedImage === image 
                ? "ring-2 ring-primary border-primary" 
                : "hover:border-primary/50 opacity-70 hover:opacity-100"
            )}
            title={`View image ${index + 1}`}
          >
            <Image
              src={image}
              alt={`${title} - Thumbnail ${index + 1}`}
              fill
              className="object-contain p-2"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
