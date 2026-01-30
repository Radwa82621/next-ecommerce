"use client"
import { getCart } from '@/cartActions/getCart.action'
import React, { useContext, useEffect, useState } from 'react'
import { CartData } from '@/types/cart'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { removeCartItem } from '@/cartActions/removeCartItem'
import { toast } from 'sonner'
import { UpdateQuantity } from '@/cartActions/updateQuantity.action'
import { clearCart } from '@/cartActions/clearCart.action'
import { cartContext } from '@/context/cartContext'
import { Product } from '@/types'

export default function CartPage() {
  const [cart, setCart] = useState<CartData | null>(null)
  const [loading, setLoading] = useState(true)
const {NumberOfCartItems,setNumberOfCartItems} =useContext(cartContext)
  useEffect(() => {
    handleGetCart()
  }, [])

  async function handleGetCart() {
    try {
      let res = await getCart()
      console.log("cartRes", res)
      if (res.status === 'success') {
        setCart(res.data)
      }
    } catch (error) {
      console.error("Failed to fetch cart", error);
    } finally {
      setLoading(false)
    }
  }

  async function handleDeleteCartItem(id: string) {
    console.log(id);
    setLoading(true)

    try {
      let res = await removeCartItem(id)
      console.log("cartRes after delete", res)
      if (res.status === 'success') {
        let cartId=res.cartId
        console.log("cartId",cartId);
        
        setCart(res.data)

        let sum = 0
        res.data.products.forEach((el:Product)=>{
               sum+=el.count!

        })
        setNumberOfCartItems(sum)
        toast.success("Item removed from cart")
      } else {
        toast.error("Failed to remove item")
      }
    } catch (error) {
      console.error("Failed to delete item", error);
      toast.error("Error occurred while deleting item")
    } finally {
      setLoading(false) // Optionally keep loading state logic if desired
    }
  }


    async function handleUpdateCartItemQuantity(id: string,quantity:number,flag:string) {
  
    setLoading(true)

    try {
      let res = await UpdateQuantity(id,quantity)
      console.log("cartRes after update quantity", res)
      if (res.status === 'success') {
       
        
        setCart(res.data)
        toast.success("Cart updated successfully")
        if(flag=="inc"){
          setNumberOfCartItems(NumberOfCartItems+1)
        }else{
                   setNumberOfCartItems(NumberOfCartItems-1)
 
        }
      } else {
        toast.error("Failed to update item quantity")
      }
    } catch (error) {
      console.error("Failed to update item quantity", error);
      toast.error("Error occurred while updating item")
    } finally {
      setLoading(false) // Optionally keep loading state logic if desired
    }
  }



    async function handleClearCart() {
    try {
      let res = await clearCart()
      console.log("cartRes", res)
      if (res.message === 'success') {
                toast.success("cart removed successfully")

        setCart(null)
        setNumberOfCartItems(0)
      }
    } catch (error:any) {
      console.error("Failed to clear cart", error);
              toast.error( error.message? error.message:  "error while clear cart")

    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-4">
              {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-32 w-full rounded-xl" />
              ))}
           </div>
           <div className="lg:col-span-1">
              <Skeleton className="h-64 w-full rounded-xl" />
           </div>
        </div>
      </div>
    )
  }

  if (!cart || cart.products.length === 0) {
    return (
      <div className="mx-auto py-16 flex flex-col items-center justify-center text-center space-y-4">
        <div className="bg-gray-100 p-6 rounded-full">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
        <p className="text-muted-foreground max-w-md">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild className="mt-4">
            <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Shopping Cart ({cart.products.length} Items)</h1>
        <Button variant="outline" className="text-red-500 hover:text-red-600 border-red-200 hover:bg-red-50 gap-2" onClick={() => handleClearCart()}>
          <Trash2 className="w-4 h-4" />
          Clear Cart
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.products.map((item) => (
            <Card key={item._id} className="overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {/* Product Image */}
                  <Link href={`/products/${item.product.id}`}>
                  <div className="relative w-full sm:w-32 aspect-[4/3] sm:aspect-square bg-gray-100 rounded-md overflow-hidden shrink-0">
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col justify-between space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <Link href={`/products/${item.product.id}`}>
                        <h3 className="font-semibold text-lg line-clamp-1 hover:underline">{item.product.title}</h3>
                       </Link>
                        <p className="text-sm text-muted-foreground">{item.product.category.name}</p>
                      </div>
                      <div className="text-right">
                          <p className="font-bold text-lg">${item.price}</p>
                          {item.count > 1 && (
                            <span className="text-xs text-muted-foreground">/per item</span>
                          )}


                             <div className="text-right my-3">
                            <p className="font-medium text-sm text-muted-foreground">Total</p>
                             <p className="font-bold text-primary">${item.price * item.count}</p>
                         </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
                       {/* Quantity Controls */}
                       <div className="flex items-center border rounded-md">
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none" onClick={() => handleUpdateCartItemQuantity(item.product.id, item.count - 1,"dec")} disabled={item.count <= 1}>
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-10 text-center text-sm font-medium">{item.count}</span>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none" onClick={() => handleUpdateCartItemQuantity(item.product.id, item.count + 1,"inc")}>
                            <Plus className="w-3 h-3" />
                          </Button>
                       </div>

                       {/* Total Price for Item & Remove */}
                       <div className="flex items-center gap-4 ml-auto sm:ml-0">
                      
                         <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={()=>{handleDeleteCartItem(item.product.id)}}>
                            <Trash2 className="w-4 h-4" />
                         </Button>
                      
                       </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
           <Card className="sticky top-24">
              <CardContent className="p-6 space-y-4">
                 <h2 className="text-xl font-bold">Order Summary</h2>
                 <Separator />
                 <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                       <span className="text-muted-foreground">Subtotal</span>
                       <span className="font-medium">${cart.totalCartPrice}</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-muted-foreground">Shipping</span>
                       <span className="font-medium text-green-600">Free</span>
                    </div>
                 </div>
                 <Separator />
                 <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-xl font-bold text-primary">${cart.totalCartPrice}</span>
                 </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                 <Link href={`/checkout/${cart._id}`} className=" block w-full h-12 text-base">
                 <Button className="w-full h-12 text-base">
                    Proceed to Checkout
                 </Button>
                 </Link>
              </CardFooter>
           </Card>
        </div>

      </div>
    </div>
  )
}
