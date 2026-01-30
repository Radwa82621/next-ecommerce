"use client"
import { addToCart } from '@/cartActions/addToCart.action';
import { Button } from '@/components/ui/button'
import { cartContext } from '@/context/cartContext';
import { ShoppingCart } from 'lucide-react'
import React, { useContext } from 'react'
import { toast } from 'sonner';

interface AddBtnProps {
  id: string;
  className?: string;
}

export default function AddBtn({ id, className }: AddBtnProps) {
    let { NumberOfCartItems,setNumberOfCartItems} = useContext(cartContext)

    async function handleAddToCart(productId:string){
        console.log("add");
        console.log(id , "productId");
try {
    let res = await addToCart(productId)
    console.log(res);
    if(res.status=="success"){
        setNumberOfCartItems(NumberOfCartItems+1)
        toast.success("added to cart",{
            duration:2000,
            position:'bottom-right'
        })
    }else{
        toast.error("failed to add to cart",{
            duration:2000,
            position:'bottom-right'
        })
    }
} catch (error:any) {
    console.log(error);
    toast.error( error?.message?error.message:"failed to add to cart",{
        duration:2000,
        position:'bottom-right'
    })
}
    }

  return (
      <Button onClick={() => handleAddToCart(id)} className={className || "flex-1 gap-2 group/btn"} size="sm">
            <ShoppingCart className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
            Add to Cart
        </Button>
  )
}
